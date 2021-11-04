Vue.config.devtools = true;
window.addEventListener("DOMContentLoaded", () => {
  const vueApp = new Vue({
    el: "#vueApp",
    data: {
      selectedContact: 0,
      newMessage: "",
      contacts: [
        {
          name: "Michele",
          avatar: "_1",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              text: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              text: "Ricordati di dargli da mangiare",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              text: "Tutto fatto!",
              status: "received",
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "_2",
          visible: true,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              text: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              text: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              text: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
            },
          ],
        },
        {
          name: "Samuele",
          avatar: "_3",
          visible: true,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              text: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              text: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              text: "Ah scusa!",
              status: "received",
            },
          ],
        },
        {
          name: "Luisa",
          avatar: "_4",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              text: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              text: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
      ],
    },
    methods: {
      /**
       *
       * @param {number} newIndex
       */
      setSelectedContact(newIndex) {
        this.selectedContact = newIndex;
      },
      /**
       *
       * @param {string} inputMessage
       */
      validateMessage(inputMessage) {
        if (inputMessage.trim === "") {
          return false;
        }
        return true;
      },
      /**
       *
       * @param {string} newMessage
       */
      addNewMessage(newMessage) {
        if (this.validateMessage(newMessage)) {
          const newMsgObj = {
            date: this.getDateString(),
            text: newMessage.trim(),
            status: "sent",
          };

          this.pushMessageOnActiveChat(newMsgObj);
          this.resetMessageInput();
          setTimeout(this.sendAutomaticResponse, 1000);
        }
      },
      pushMessageOnActiveChat(newMsgObj) {
        this.contacts[this.selectedContact].messages.push(newMsgObj);
      },
      resetMessageInput() {
        this.newMessage = "";
      },
      sendAutomaticResponse() {
        const newMessage = {
          date: this.getDateString(),
          text: "New Automatic Message Reply",
          status: "received",
        };
        this.pushMessageOnActiveChat(newMessage);
      },
      getDateString() {
        return "xxxxx";
      },
    },
  });
});
