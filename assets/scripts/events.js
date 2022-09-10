'use strict'

const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('./store')

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onPasswordChange = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.passwordChange(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const getLocations = function (event) {
  event.preventDefault()
  // const userId = store.user.id
  api.show()
    .then(ui.getLocationsSuccess)
    // Enables delete button function after loading of content, probably keep it on find location as well. Probably move it to it's own function
    .catch(ui.getLocationsFailure)
    .then(function () {
      $('.removeButton').on('click', deleteLocation)
    })
    .then(function () {
      $('.updateButton').on('submit', updateLocation)
    })
}

const getLocationsNoButton = function (event) {
  api.show()
    .then(ui.getLocationsSuccess)
    // Enables delete button function after loading of content, probably keep it on find location as well. Probably move it to it's own function
    .catch(ui.getLocationsFailure)
    .then(function () {
      $('.removeButton').on('click', deleteLocation)
    })
    .then(function () {
      $('.updateButton').on('submit', updateLocation)
    })
}

const findLocationAddButton = function () {
  $('.removeButton').on('click', deleteLocation)
  $('.updateButton').on('submit', updateLocation)
}

const deleteLocation = function (event) {
  event.preventDefault()
  const locationId = event.target.getAttribute('data-id')
  api.removeLocation(locationId)
    .then(ui.deleteLocationSuccess)
    .then(getLocationsNoButton)
    .catch(ui.deleteLocationFailure)
}

const updateLocation = function (event) {
  event.preventDefault()
  const locationId = event.target.getAttribute('data-id')
  const data = getFormFields(event.target)
  api.updateLocation(locationId, data)
    .then(ui.updateLocationSuccess)
    .then(getLocationsNoButton)
    .catch(ui.updateLocationFailure)
}

const singleLocation = function (data) {
  for (let i = 0; i < store.locations.length; i++) {
    if (store.locations[i].address === data) {
      return store.locations[i].id
    } else {
    }
  }
}

const findLocation = function (event) {
  event.preventDefault()
  const findData = getFormFields(event.target)
  const locationId = singleLocation(findData.locations.Id)
  // const userId = store.user.id
  api.find(locationId)
    .then(ui.findLocationSuccess)
    .then(findLocationAddButton)
    .catch(ui.findLocationFailure)
}

const createLocation = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  // const userId = store.user.id
  api.create(data)
    .then(ui.createLocationSuccess)
    .then(getLocationsNoButton)
    .catch(ui.createLocationFailure)
}

const getCompanies = function (event) {
  event.preventDefault()
  // const userId = store.user.id
  api.showCompanies()
    .then(ui.getCompaniesSuccess)
    // Enables delete button function after loading of content, probably keep it on find location as well. Probably move it to it's own function
    .catch(ui.getCompaniesFailure)
    .then(function () {
      $('.removeCompanyButton').on('click', deleteCompany)
    })
    .then(function () {
      $('.updateFormCompanyButton').on('submit', updateCompany)
    })
}

const getCompaniesNoButton = function (event) {
  api.showCompanies()
    .then(ui.getCompaniesSuccess)
    // Enables delete button function after loading of content, probably keep it on find location as well. Probably move it to it's own function
    .catch(ui.getCompaniesFailure)
    .then(function () {
      $('.removeCompanyButton').on('click', deleteCompany)
    })
    .then(function () {
      $('.updateFormCompanyButton').on('submit', updateCompany)
    })
}

const deleteCompany = function (event) {
  event.preventDefault()
  const companyId = event.target.getAttribute('data-id')
  api.removeCompany(companyId)
    .then(ui.deleteCompanySuccess)
    .then(getCompaniesNoButton)
    .catch(ui.deleteCompanyFailure)
}

const updateCompany = function (event) {
  event.preventDefault()
  const companyId = event.target.getAttribute('data-id')
  const data = getFormFields(event.target)
  api.updateCompany(companyId, data)
    .then(ui.updateCompanySuccess)
    .then(getCompaniesNoButton)
    .catch(ui.updateCompanyFailure)
}

const createCompany = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  // const userId = store.user.id
  api.createCompany(data)
    .then(ui.createCompanySuccess)
    .then(getCompaniesNoButton)
    .catch(ui.createCompanyFailure)
}

const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .then(getLocationsNoButton)
    .then(getCompaniesNoButton)
    .catch(ui.signInFailure)
}

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onPasswordChange)
  $('#getLocationButton').on('click', getLocations)
  $('#findLocation').on('submit', findLocation)
  $('#addLocation').on('submit', createLocation)
  $('#getCompanyButton').on('click', getCompanies)
  $('#addCompany').on('submit', createCompany)
}

module.exports = {
  addHandlers
}
