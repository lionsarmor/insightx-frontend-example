<template>
    <div class="wrapper">
        <div class="d-block text-center">
            <h3 style="color:green">{{currentUsername}}</h3>
            <h3 class="white">Recover Username</h3>
            Enter your recovery phrase:
            <b-form-textarea ref="usernamerecover" v-model="recoverphrase" placeholder="Enter your recovery phrase." :rows="3" :no-resize="true" :max-rows="6">
            </b-form-textarea><br>
            <button class="btn-fil-blue2" @click="recover()" variant="success lg">Recover</button><br>
        </div>
    </div>
</template>

<script>
    export default {
        layout: 'default',
        data() {
            return {
                currentUsername: '',
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
            recover() {
                let url = this.endpoint + 'api/recover';
                let recover = this.recoverphrase;
                let that = this;
                let bodysend = JSON.stringify({
                    'recoveryphrase': recover
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
                    })
                    .then(res => res.json())
                    .then((out) => {
                        if (out.result === 'success') {
                            that.currentUsername = "Username: " + out.username
                        } else if (out.result === 'failed') {
                            that.$toast.error(out.message, {
                                icon: 'warning'
                            });
                        } else {
                            that.error = "Failed to recover username contact administration."
                            that.$toast.error(that.error, {
                                icon: 'warning'
                            });
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

    .pull-right {
        position: relative;
        margin-left: 80%;
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

    .wrapper {
        width: 25%;
        margin: auto;
        margin-top: 10%;
    }

    .noLine {
        text-decoration: none;
    }

    .noLine:hover {
        text-decoration: none;
    }
</style>