<template>
   <div class="wrapper">
 <div class="d-block text-center">
                                <h3 class="white">Reset Password</h3>
                                <b-form-textarea ref="passwordreset" v-model="recoverphrase" placeholder="Enter your recovery phrase." :rows="3" :no-resize="true" :max-rows="6">
                                </b-form-textarea>
                                Enter a Password:
                                <b-form-input type="text" ref="passwordrec"></b-form-input>
                                Confirm Password:
                                <b-form-input type="text" ref="confirmpasswordrec"></b-form-input>
                                <button class="btn-fil-blue2" @click="reset()" variant="success lg">Reset</button><br>
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
            reset() {
                let confirmedpass = this.$refs.confirmpasswordrec.$el.value
                let password = this.$refs.passwordrec.$el.value
                if (confirmedpass != password) {
                    this.error = "Passwords do not match!"
                    this.$toast.error(that.error, {icon: 'warning'});
                }
                if (confirmedpass.lenth < 8) {
                    this.error = "Passwords must be atleast 8 characters"
                                        toastr.warning("Passwords must be atleast 8 characters");

                }
                let url = this.endpoint + 'api/reset'
                let recover = this.recoverphrase
                let that = this
                let bodysend = JSON.stringify({
                    "recoveryphrase": recover,
                    'newpassword': password
                })
                fetch(url, {
                        method: "POST",
                        mode: 'cors',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        credentials: 'same-origin',
                        body: bodysend
                    }).then(res => res.json())
                    .then((out) => {
                        if (out.result === 'success') {
                            that.error = out.message
                            that.$refs.resetModal.hide()
                            that.$refs.signInModal.show()

                        } else if (out.result === 'failed') {
                            that.error = out.message
                    that.$toast.error(out.message, {icon: 'warning'});
                        } else {
                            that.error = "Failed to recover username contact administration."
                    that.$toast.error(that.error, {icon: 'warning'});
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