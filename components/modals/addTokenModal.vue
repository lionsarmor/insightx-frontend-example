 <template>
     <div>
         <b-modal id="code" v-model="$store.state.modals.addTokenModal"  @hide="toggleAddTokenModal()" :header-bg-variant="headerBgVariant" :header-text-variant="headerTextVariant" :body-bg-variant="bodyBgVariant" :body-text-variant="bodyTextVariant" :footer-bg-variant="footerBgVariant" :footer-text-variant="footerTextVariant">
             <b-container>
                 <br />
                 <br />
                 <b-row class="my-1">
                     <b-col sm="2"><label style="font-size: 12px;" for="input-large">Code:</label></b-col>
                     <b-col sm="10">
                         <b-form-input class="drop-input" v-model="newCode" id="input-large" size="lg" type="text" placeholder="Enter New Partner Code"></b-form-input>
                     </b-col>
                 </b-row>
             </b-container>
             <div slot="modal-footer" class="w-100">
                 <button size="sm" class="float-left btn-fil-red" variant="primary" @click="$root.$emit('bv::hide::modal','code')">CLOSE</button>
                 <button size="sm" class="float-right btn-fil-blue" variant="primary" @click="changePromoCode(newCode)">
                     SUBMIT
                 </button>
             </div>
        <div slot="modal-header" class="w-100">
            <h5>New Partner Code</h5>
         </div>
         </b-modal>
     </div>
 </template>
 <script>
     export default {
         props: ['userInfo'],
         data() {
             return {
                 endpoint: this.$store.state.apiEndPoint,
                 stars: '',
                 tokenStars: '',
                 usernameStars: '',
                 show: 'show',
                 tokenShow: 'show',
                 usernameShow: 'show',
                 partnerCode: null,
                 partnerToken: null,
                 newCode: null,
                 username: null,
                 showMod: false,
                 headerBgVariant: 'black',
                 headerTextVariant: 'light',
                 bodyBgVariant: 'black',
                 bodyTextVariant: 'light',
                 footerBgVariant: 'black',
                 footerTextVariant: 'light'
             }
         },
         methods: {
             toggleAddTokenModal() {
                 this.$store.commit('modals/toggleAddToken');
             },
             resetPartnerToken: function() {
                 let that = this
                 this.$insightfetch('resetpartnertoken', 'GET').then(function(myResponse) {
                     if (myResponse.result == 'success') {
                         that.partnerToken = myResponse.token
                         let newUserInfo = that.userInfo
                         newUserInfo.partnerToken = myResponse.token
                         that.$store.commit('updateKey', {
                             'key': 'userInfo',
                             'newData': newUserInfo
                         })
                         if (that.tokenShow == 'hide') {
                             that.tokenStars = myResponse.token
                         }
                          that.$toast.success(myResponse.result, {icon: 'check'} )
                     }
                 })
             },
             changePromoCode: function(newCode) {
                 let that = this
                 newCode = (newCode.replace(' ', '')).toLowerCase()
                 this.$insightfetch('inputpartnercode?code=' + newCode, 'GET', null, 'cors', 'same-origin', true).then(function(myResponse) {
                     if (myResponse.result == 'success') {
                         that.partnerCode = newCode
                         let newUserInfo = that.userInfo
                         newUserInfo.partnerCode = newCode
                         that.$store.commit('updateKey', {
                             'key': 'userInfo',
                             'newData': newUserInfo
                         })
                         if (that.show == 'hide') {
                             that.stars = newCode
                         }
                         that.showMod = false;
                     }
                     return myResponse;
                 }).then(function(response) {
                     that.$router.go()
                 })
             },
             wipePromoCode: function() {
                 let that = this
                 this.$insightfetch('wipepartnercode', 'GET', null, 'cors', 'same-origin', true).then(function(myResponse) {
                     if (myResponse.result == 'success') {
                         that.partnerCode = 'none'
                         let newUserInfo = that.userInfo
                         newUserInfo.partnerCode = 'none'
                         that.$store.commit('updateKey', {
                             'key': 'userInfo',
                             'newData': newUserInfo
                         })
                         if (that.show == 'hide') {
                             that.stars = 'none'
                         }
                     }
                     return myResponse;
                 }).then(function(response) {
                     that.$router.go()
                 })
             },
             numberStars: function() {
                 var tokenTemp = this.partnerCode
                 if (!tokenTemp) {
                     return
                 }
                 var starlength = tokenTemp.length;
                 for (var i = 0; i < starlength; i++) {
                     this.stars += ('*');
                 }
             },
             numberStarsToken: function() {
                 var tokenTemp = this.partnerToken
                 if (!tokenTemp) {
                     return
                 }
                 var starlength = tokenTemp.length;
                 for (var i = 0; i < starlength; i++) {
                     this.tokenStars += ('*');
                 }
             },
             numberStarsUsername: function() {
                 var tokenTemp = this.username
                 if (!tokenTemp) {
                     return
                 }
                 var starlength = tokenTemp.length;
                 for (var i = 0; i < starlength; i++) {
                     this.usernameStars += ('*');
                 }
             }
         },

         mounted() {}
     }
 </script>
 <!-- Add "scoped" attribute to limit CSS to this component only -->
 <style scoped>
     .btn-add {
         background: #345278 !important;
     }

     .modal-black {
         background: black;
     }

     .dark2 {
         background-color: black !important;
     }

     .token-text {
         font-size: 9px;
         float: left;
         position: relative;
         left: -50px;
     }

     .token-text2 {
         font-size: 13px;
         letter-spacing: 1px;
         float: left;
         color: #7648eb !important;
         position: relative;
         left: -50px;
         font-weight: bolder;
     }

     .border-set {
         border-radius: 5px;
         border: 5px solid rgb(37, 36, 36);
     }

     .btn-primary {
         background: #345278 !important;
         border: none;
         padding: 3px;
     }

     .font-style {
         font-family: 'Montserrat', sans-serif;
     }

     .token-text {
         font-size: 11px;
         float: left;
     }

     .white {
         color: white;
     }

     .white-hr {
         background: rgb(117, 112, 112);
         width: 80%;
     }

     .wrapper {
         margin-left: auto;
         margin-right: auto;
         width: 100%;
         height: 250px;
         overflow: hidden !important;
         overflow-y: scroll !important;
     }

     textarea {
         background: #1a1a1a;
         color: white;
     }

     textarea:focus {
         background: #1a1a1a;
         color: white;
     }

     input:focus {
         background: #1a1a1a;
         color: white;
     }

     .drop-input {
         color: white;
         background: #1a1a1a;
         border: none;
         font-size: 12px;
         height: 30px;
     }

     .btn-fil-blue {
         color: white !important;
         background-color: #000000 !important;
         border-style: solid;
         border-width: 2px;
         border-color: #047ea4;
         border-radius: 25px;
         height: 37px;
         position: relative;
         top: 3px;
         cursor: pointer;
     }

     .btn-fil-yellow {
         color: white !important;
         background-color: #000000 !important;
         border-style: solid;
         border-width: 2px;
         border-color: #a3972d;
         border-radius: 25px;
         height: 37px;
         position: relative;
         top: 3px;
         cursor: pointer;
     }

     .btn-fil-red {
         color: white !important;
         background-color: #000000 !important;
         border-style: solid;
         border-width: 2px;
         border-color: #a41704;
         border-radius: 25px;
         height: 37px;
         position: relative;
         top: 3px;
         cursor: pointer;
     }

     input {
         background: #1a1a1a;
         color: white;
     }
 </style>