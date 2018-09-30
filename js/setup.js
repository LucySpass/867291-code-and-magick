'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var NUMBER_OF_WIZARDS = 4;

var isDialogOpen = true;

function getValue(array) {
  return deleteUsedArrayValue(array, getRandomArrayValue(array));
}

function getRandomArrayValue(array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
}

function deleteUsedArrayValue(array, value) {
  array.splice(array.indexOf(value), 1);
  return value;
}

function closeDialog() {
  document.querySelector('.setup').classList.add('hidden');
  isDialogOpen = false;
}

function openDialog() {
  document.querySelector('.setup').classList.remove('hidden');
  isDialogOpen = true;
}

function changeColor(element, tempArray, constArray, input) {
  element.addEventListener('click', function () {
    if (tempArray.length === 0) {
      tempArray = constArray.slice();
    }
    var randomValue = getValue(tempArray);

    if (constArray.length === FIREBALL_COLORS.length && constArray.every(function (value, index) {
      return value === FIREBALL_COLORS[index];
    })) {
      element.style.background = randomValue;
    } else {
      element.style.fill = randomValue;
    }
    input.value = randomValue;
  });
}

function main() {
  var setup = document.querySelector('.setup');
  var similarListElement = setup.querySelector('.setup-similar-list');

  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var inputWizardCoat = document.querySelector('.setup-player input[name=coat-color]');
  var coatColors = WIZARD_COAT_COLOR.slice();

  var wizardEye = document.querySelector('.setup-wizard .wizard-eyes');
  var inputWizardEyes = document.querySelector('.setup-player input[name=eyes-color]');
  var eyesColors = WIZARD_EYES_COLOR.slice();

  var fireballElement = document.querySelector('.setup-fireball-wrap');
  var inputFireball = document.querySelector('.setup-fireball-wrap input[name=fireball-color]');
  var fireballColors = FIREBALL_COLORS.slice();

  var similarWizardTemplate = document
    .querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var generateWizard = function () {
    var wizard = similarWizardTemplate.cloneNode(true);
    wizard.querySelector('.setup-similar-label').textContent = getValue(WIZARD_NAMES) + ' ' + getValue(WIZARD_SURNAMES);
    wizard.querySelector('.wizard-coat').style.fill = getValue(coatColors);
    wizard.querySelector('.wizard-eyes').style.fill = getValue(eyesColors);

    return wizard;
  };

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    fragment.appendChild(generateWizard());
  }

  similarListElement.appendChild(fragment);

  setup.classList.remove('hidden');
  setup.querySelector('.setup-similar').classList.remove('hidden');

  document.querySelector('.setup-open').addEventListener('click', function () {
    openDialog();
  });

  document.querySelector('.setup-close').addEventListener('click', function () {
    closeDialog();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      if (document.activeElement.classList.contains('setup-close') ||
        document.activeElement.classList.contains('setup-submit')) {
        closeDialog();
      }
      if (document.activeElement.classList.contains('setup-open-icon')) {
        openDialog();
      }
    }
    if (event.key === 'Escape' && isDialogOpen &&
      !document.activeElement.classList.contains('setup-user-name')) {
      closeDialog();
    }
  });

  changeColor(wizardCoat, coatColors, WIZARD_COAT_COLOR, inputWizardCoat);
  changeColor(wizardEye, eyesColors, WIZARD_EYES_COLOR, inputWizardEyes);
  changeColor(fireballElement, fireballColors, FIREBALL_COLORS, inputFireball);
}

main();
