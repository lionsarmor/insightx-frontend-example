<template>
   <div class="wrapper">
 <div class="d-block text-center">
                                <h3>Register</h3>
                                Enter a Username:
                                <b-form-input ref="username" type="text" placeholder="username"></b-form-input>
                                Enter a Password:
                                <b-form-input type="password" ref="password" placeholder="password"></b-form-input>
                                <label style="font-size:12px; color:gray;">*Minimum of 8 characters</label><br>
                                Confirm Password:
                                <b-form-input type="password" ref="confirmpassword" placeholder="confirm password"></b-form-input>
                                Recovery Phrase:
                                <button class="btn-fil-wordGen mt-3" variant="success" block @click="getWords">Make Me A Phrase</button>
                                <b-form-textarea ref="recoveryphrase" id="securephrase" v-model="securephrase" placeholder="Enter 10-20 words" :rows="3" :no-resize="true" :max-rows="6">
                                </b-form-textarea>
                                 <label style="font-size:11px;color:gray;">*Promotional Code (optional)</label>
                                <b-form-input ref="promoCode" type="text" placeholder="Enter Promo Code"></b-form-input><br>
                                <button class="btn-fil-blue2 mt-3" variant="success" block @click="signup">Signup</button>
                            </div>
   </div>
</template>

<script>
    export default {
        layout: 'default',
        data() {
            return {
                recoverphrase: '',
                password: null,
                confirmpassword: null,
                securephrase: '',
                resultmessage: '',
                endpoint: this.$store.state.apiEndPoint,
                error: ""
            }
        },
    methods: {
            getWords() {
                let that = this
                this.$insightfetch('api/randomRecovery', 'GET', null, 'cors', 'same-origin', false).then(function(myResponse) {
                    if (myResponse.result == 'success') {
                        that.securephrase = myResponse.words
                    }
                })
            },
            signup() {
                let username = this.$refs.username.$el.value;
                let password = this.$refs.password.$el.value;
                let confirmpassword = this.$refs.confirmpassword.$el.value;
                let recoveryphrase = this.$refs.recoveryphrase.$el.value;
                let promo = this.$refs.promoCode.$el.value;
                if (username.length < 8 || password.length < 8) {
                    this.resultmessage = "Please use a minimum of 8 characters for username and password"
                    this.$toast.error(this.resultmessage, {icon: 'warning'});
                    return
                }
                if (recoveryphrase.length < 20) {
                    this.resultmessage = "Please make sure your recovery phrase is more than 20 characters"
                    this.$toast.error(this.resultmessage, {icon: 'warning'});
                   return
                }
                if (password != confirmpassword) {
                    this.resultmessage = "Passwords do not match!"
                    this.$toast.error(this.resultmessage, {icon: 'warning'});
                    return
                }
                let url = this.endpoint + 'api/user'
                let that = this
                let header = {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
                var bodies = JSON.stringify({
                    'username': username,
                    'password': password,
                    'recoveryphrase': recoveryphrase,
                    'partnercode' : promo
                });

                fetch(url, {
                        method: "POST",
                        mode: 'cors',
                        headers: header,
                        body: bodies
                    })
                    .then(res => res.json())
                    .then((out) => {
                        if (out.result === 'success') {
                            that.$toast.success(out.result, {icon: 'check'});
                            that.$router.push('/login')
                        } else if (out.result === 'failed') {
                            that.resultmessage = out.message
                            that.$toast.error(that.resultmessage, {icon: 'warning'});
                        } else {
                            that.resultmessage = "Failed to signup contact administration."
                            that.$toast.error(that.resultmessage, {icon: 'warning'});
                        }
                    })
                    .catch(err => {
                        throw err
                    })
            }
        },
        components: {

}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Anton|Open+Sans+Condensed:300|Righteous|Shrikhand');
.pull-right{
  position: relative;
  margin-left:80%;
}

    .btn-fil-blue {
        color: white !important;
        background-color: #047ea4 !important;
        border-style: solid;
        border-width: 2px;
        border-color: #047ea4;
        border-radius: 25px;
        height: 37px;
        position: relative;
        top: 3px;
        cursor: pointer;
    }

    .btn-fil-blue2 {
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

    .btn-fil-wordGen {
        color: white !important;
        background-color: #000000 !important;
        border-style: solid;
        border-width: 2px;
        border-color: #047ea4;
        border-radius: 25px;
        height: 22px;
        position: relative;
        left: 8px;
        bottom: 3px;
        cursor: pointer;
        font-size: 9px;
    }

    input {
        background: #1a1a1a;
        color: white;
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
    .wrapper{
        width: 25%;
        margin: auto;
        margin-top:10%;
    }
        .noLine {
    text-decoration: none;
    }
    .noLine:hover {
    text-decoration: none;
    }
</style>