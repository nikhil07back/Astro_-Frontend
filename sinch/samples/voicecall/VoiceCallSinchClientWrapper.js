import {
  getJwtToken,
  getUserId,
  getApplicationKey,
  API_URL,
} from "../common/common.js";
import VoiceCallUI from "./VoiceCallUI.js";

export default class VoiceCallSinchClientWrapper {
  constructor() {
    console.log("call init");

    // Register the ServiceWorker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/voicecall/sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
          this.initializeSinchClient();
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    } else {
      console.error('Service Workers are not supported in this browser.');
    }
  }

  initializeSinchClient() {
    this.ui = new VoiceCallUI(this);
    const sinchClient = Sinch.getSinchClientBuilder()
      .applicationKey(getApplicationKey())
      .userId(getUserId())
      .environmentHost(API_URL)
      .build();

    sinchClient.addListener(this.#sinchClientListener());
    sinchClient.setSupportManagedPush();
    sinchClient.start();

    this.sinchClient = sinchClient;
  }

  async makeCall(callee) {
    console.log("calling");
    const call = await this.sinchClient.callClient.callUser(callee);
    this.ui.onOutboundCall(call);
    this.#callListeners(call);
  }

  #sinchClientListener() {
    return {
      onClientStarted: (sinchClient) => {
        const { callClient } = sinchClient;
        callClient.addListener({
          onIncomingCall: (client, call) => {
            this.ui.onIncomingCall(call);
            this.#callListeners(call);
          },
        });

        this.ui.onClientStarted(sinchClient);
      },

      onCredentialsRequired: (sinchClient, clientRegistration) => {
        getJwtToken()
          .then(clientRegistration.register)
          .catch((error) => {
            clientRegistration.registerFailed();
            console.error('Sinch - Registration failed', error);
          });
      },

      onClientFailed: (sinchClient, error) => {
        console.log("Sinch - Start client failed");
        console.error(error);
      },
    };
  }

  #callListeners(currentCall) {
    currentCall.addListener({
      onCallProgressing: (call) => {
        this.ui.onCallProgressing(call);
      },
      onCallEstablished: (call) => {
        this.ui.onCallEstablished(call);
      },
      onCallEnded: (call) => {
        this.ui.onCallEnded(call);
      },
    });
  }
}
