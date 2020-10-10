<template>
    <div class="wrapper container">
        <div class="d-block text-center">
            <h3>Login</h3>
            <b-form-input ref="usernameLogin" type="text" placeholder="Username"></b-form-input><br>
            <b-form-input ref="passwordLogin" type="password" placeholder="Password"></b-form-input><br>
            <button class="btn-fil-blue2" @click="login" variant="success lg">Login</button><br>
        </div>
        <nuxt-link to="/recover" class="noLine"><span style="font-size:12px;color:#047ea4 !important;">Forgot username? <div class='recover' style="cursor:pointer;color:#da1e2d;">Recover</div></span></nuxt-link>
        <nuxt-link to="/reset" class="noLine"><span style="font-size:12px;color:#047ea4 !important;">Forgot password? <div class='recover' style="cursor:pointer;color:#da1e2d;">Reset</div></span></nuxt-link>
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
            login() {
                let that = this
                that.$router.push('/portfolio');
            }
  /*            // this.$toast.error('test');
                let url = this.endpoint + 'api/token'
                let username = this.$refs.usernameLogin.$el.value
                let password = this.$refs.passwordLogin.$el.value
                let that = this;
                if (username == null || password == null || username.length == 0 || password.length == 0) {
                    that.error = "No username or password provided."
                    that.$toast.error(that.error, {
                        icon: 'warning'
                    });
                    return
                }
                that.$store.commit('updateTickerLoader');
                fetch(url, {
                        headers: {
                            'Accept': 'application/json, text/plain, *///*',
                           /* 'Content-Type': 'application/json',
                            'Authorization': 'Basic ' + btoa(username + ':' + password)
                        },
                        credentials: 'same-origin'
                    })
                    .then(function(response) {
                        if (response.status == '401') {
                            that.$toast.error('Bad Username or Password', {
                                icon: 'warning'
                            });
                        }
                        return response.json();
                    })
                    .then((out) => {
                        if (out.result === 'success') {
                            var delayInMilliseconds = 1000
                            var that = this
                            setTimeout(function() {
                                that.$toast.success("Success.", {
                                    icon: 'check'
                                });
                                sessionStorage.setItem('token', out.token);
                                that.$store.commit('updatePage', "portfolio");
                                that.$store.commit('localStorage/updateTickerData', out.ticker);
                                that.$store.commit('localStorage/updateTotalMarketCap', out.totalcap);
                                that.$store.commit('localStorage/SET_USER', out.result)
                                that.$router.push('/portfolio');
                            }, delayInMilliseconds)
                        } else if (out.result === 'failed') {
                            that.error = out.message
                            that.$toast.error(that.error, {
                                icon: 'warning'
                            });
                        } else {
                            that.error = "failed to login"
                            that.$toast.error(that.error, {
                                icon: 'warning'
                            });
                        }
                    })
                    .catch(err => {
                        throw err
                    })
            }*/
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
        margin:auto;
        margin-top: 10%;
        max-width:28%;
    }

    .noLine {
        text-decoration: none;
    }

    .noLine:hover {
        text-decoration: none;
    }
</style>