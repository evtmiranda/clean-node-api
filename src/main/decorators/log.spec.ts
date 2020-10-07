import { Controller } from '../../presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '../../presentation/protocols/http'
import { LogControllerDecorator } from './log'
import { serverError } from '../../presentation/helpers/http-helper'
import { LogErrorRepository } from '../../data/protocols/log-error-repository'

const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle(): Promise<HttpResponse> {
      return await Promise.resolve({
        statusCode: 200,
        body: {
          name: 'any_name'
        }
      })
    }
  }
  return new ControllerStub()
}

const makeLogErrorRepositoryStub = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log(): Promise<void> {
      await Promise.resolve()
    }
  }
  return new LogErrorRepositoryStub()
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeControllerStub()
  const logErrorRepositoryStub = makeLogErrorRepositoryStub()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('LogDecorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest: HttpRequest = {
      body: {
        email: 'any_mail@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toBeCalledWith(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        email: 'any_mail@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const result = await sut.handle(httpRequest)
    expect(result).toBeTruthy()
    expect(result).toEqual({
      statusCode: 200,
      body: {
        name: 'any_name'
      }
    })
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)

    jest.spyOn(controllerStub, 'handle').mockReturnValue(Promise.resolve(error))
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')

    const httpRequest: HttpRequest = {
      body: {
        email: 'any_mail@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(logSpy).toBeCalledWith('any_stack')
  })
})
