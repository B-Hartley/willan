'use strict';

  const Denon = require('denon-client');
  var AVR_IP = '192.168.2.221';
  var AVR_PORT = '23';

  let inputSelectTextLabel = '';
  let switchPowerState = '';
  let sliderVolumeValue = 0;
  let sendComponentUpdate;

  const denonClient = new Denon.DenonClient(AVR_IP,AVR_PORT);
  denonClient.connect()

  module.exports.sliderVolumeValueSet = function(deviceid, value) {
    console.log(`[CONTROLLER] slide set to ${value} on ${deviceid}`);
    sliderVolumeValue = parseInt(value,10);
    denonClient.setVolume(sliderVolumeValue);
}; 

  module.exports.sliderVolumeValueGet = function(deviceid) {
    denonClient.getVolume;
    console.log(`[CONTROLLER] return slider value is ${sliderVolumeValue} on ${deviceid}`);
     return sliderVolumeValue;
  };

  module.exports.registerStateUpdateCallback = function(updateFunction) {
    console.log('[CONTROLLER] register update state');
    sendComponentUpdate = updateFunction;
};

  module.exports.discoverDenon = function() {
    console.log('[CONTROLLER] denon discover call');
    return [{
    id: 'denon1',
    name: 'Denon AVR',
    reachable: true}];
};


  module.exports.onButtonPressed = function onButtonPressed(name, deviceId) {
  console.log(`[CONTROLLER] ${name} button pressed on ${deviceId}`);

  switch (name) {
    case "VOLUME UP":
    denonClient.setVolume(Denon.Options.VolumeOptions.Up);
    break;

  case "VOLUME DOWN":
    denonClient.setVolume(Denon.Options.VolumeOptions.Down);
    break;
  
  case "POWER ON":
    denonClient.setPower(Denon.Options.PowerOptions.On);
    break;

  case "POWER OFF":
    denonClient.setPower(Denon.Options.PowerOptions.Standby);
    break;

  case "MUTE TOGGLE":
    denonClient.setMute(Denon.Options.MuteOptions.On);
    break;

  case "INPUT Sonos":
    denonClient.setInput(Denon.Options.InputOptions.CD);
    break;
    
  case "INPUT TUNER 1":
    denonClient.setInput(Denon.Options.InputOptions.Tuner);
    break;

  //case "INPUT BD/DVD":
  //  denonClient.setInput(Denon.Options.InputOptions.DVD);
 //   break;

  case "INPUT BluRay":
    denonClient.setInput(Denon.Options.InputOptions.BD);
    break;

  case "INPUT TV":
    denonClient.setInput(Denon.Options.InputOptions.TV);
    break;

  case "INPUT Sky Q":
    denonClient.setInput(Denon.Options.InputOptions.Sattalite);
    break;

//  case "INPUT CABLE/SATELLITE":
//    denonClient.setInput(Denon.Options.InputOptions.Cable);
//    break;

//  case "INPUT Apple TV":
//    denonClient.setInput(Denon.Options.InputOptions.MediaPlayer);
//    break;

  case "INPUT GAME":
    denonClient.setInput(Denon.Options.InputOptions.Game);
    break;

  case "INPUT AUX 1":
    denonClient.setInput(Denon.Options.InputOptions.Aux1);
    break;

//  case "INPUT ":
//    denonClient.setInput(Denon.Options.InputOptions.Aux2);
//    break;

  case "INPUT NET":
    denonClient.setInput(Denon.Options.InputOptions.Net);
    break;

//  case "INPUT ":
//    denonClient.setInput(Denon.Options.InputOptions.IPod);
//    break;

  case "INPUT Apple TV":
    denonClient.setInput(Denon.Options.InputOptions.MPlay);
    break;

//  case "INPUT ":
//    denonClient.setInput(Denon.Options.InputOptions.MXPort);
//    break;

    case "CURSOR UP":
    break;
}
};

denonClient.on('masterVolumeChanged', (volume) => {
  console.log('Volume changed to: ' + (volume));
  sliderVolumeValue = volume;
  console.log('update slider');
  sendComponentUpdate({uniqueDeviceId: 'denon1', component:'sliderVolumeValue', value: sliderVolumeValue});
 });

denonClient.on('muteChanged', (mute) => {
  console.log('mute changed to: ' + (mute));
});

denonClient.on('inputChanged', (input) => {
  console.log('input changed to: ' + (input));
  inputSelectTextLabel = input;
});

denonClient.on('powerChanged', (power) => {
  console.log('power changed to: ' + (power));
  switchPowerState = (power === 'on') ? true : false;
});


