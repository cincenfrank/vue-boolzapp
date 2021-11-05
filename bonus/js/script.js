Vue.config.devtools = true;
window.addEventListener("DOMContentLoaded", () => {
  const vueApp = new Vue({
    el: "#vueApp",
    data: {
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
      selectedContact: {},
      newMessage: "",
      searchString: "",
    },
    computed: {
      getLastReceivedDateTime() {
        if (this.selectedContact.messages) {
          const arrayCopy = [...this.selectedContact.messages];
          const lastDate = arrayCopy
            .reverse()
            .find((element) => element.status === "received");

          return lastDate ? lastDate.date : "informazione non disponibile";
        } else {
          return "informazione non disponibile";
        }
      },
      // getLastDateTime() {
      //   if (
      //     this.selectedContact.messages &&
      //     this.selectedContact.messages.length > 0
      //   ) {
      //     return this.selectedContact.messages.at(-1).date
      //       ? this.selectedContact.messages.at(-1).date
      //       : "Mai";
      //   } else {
      //     return "mai";
      //   }
      // },
      // getLastDateText() {
      //   if (
      //     this.selectedContact.messages &&
      //     this.selectedContact.messages.length > 0
      //   ) {
      //     return this.selectedContact.messages.at(-1).text
      //       ? this.selectedContact.messages.at(-1).text
      //       : "- Nessun Messaggio -";
      //   } else {
      //     return "- Nessun Messaggio -";
      //   }
      // },
    },
    methods: {
      beforeEnter(el) {
        el.style.opacity = 0;
        el.style.maxHeight = 0;
      },
      enter(el, done) {
        gsap.to(el, {
          opacity: 1,
          maxHeight: "100%",
          delay: el.dataset.index * 0.15,
          onComplete: done,
        });
      },
      leave(el, done) {
        gsap.to(el, {
          opacity: 0,
          maxHeight: 0,
          delay: el.dataset.index * 0.15,
          onComplete: done,
        });
      },
      /**
       *
       * @param {{}} newContact
       */
      setSelectedContact(newContact) {
        this.selectedContact = newContact;
      },
      /**
       *
       * @param {string} inputMessage
       */
      validateMessage(inputMessage) {
        if (inputMessage.trim() === "") {
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
          this.scrollToLastMessage();
          setTimeout(this.sendAutomaticResponse, 1000);
        }
      },
      scrollToLastMessage() {
        // items = document.querySelectorAll(".chat_message");
        // last = items[items.length - 1];
        debugger;
        last = document.querySelector(".chat_container");
        last.scrollTop = last.scrollHeight + 100;
        // last.scrollIntoView({ block: "end", inline: "nearest" });
      },
      getDateString() {
        return dayjs().format("DD/MM/YYYY HH:mm:ss");
      },
      pushMessageOnActiveChat(newMsgObj) {
        this.selectedContact.messages.push(newMsgObj);
      },
      resetMessageInput() {
        this.newMessage = "";
      },
      sendAutomaticResponse() {
        const newMessage = {
          date: this.getDateString(),
          text: "Ok",
          status: "received",
        };
        this.pushMessageOnActiveChat(newMessage);
        this.scrollToLastMessage();
      },

      /**
       *
       * @param {string} searchString
       * @returns
       */
      getFilteredContactList(searchString) {
        /**
         * @type {[{}]}
         */
        const originalList = this.contacts;
        if (searchString) {
          searchString.trim().toLowerCase();
          return originalList.filter((element) =>
            element.name
              .toLowerCase()
              .includes(searchString.trim().toLowerCase())
          );
        } else {
          return originalList;
        }
      },

      deleteMessage(indexToDelete) {
        this.selectedContact.messages.splice(indexToDelete, 1);
      },
    },
    beforeMount() {
      // this.setSelectedContact(this.contacts[0]);
    },
  });
});
