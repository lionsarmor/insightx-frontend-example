<template>
    <div class="bg blue">
        <b-jumbotron class="jumbo" style="font-family: 'Righteous', cursive !important;">
            <div class="container">
                <span style="position:relative;left:-25px;">
                    <div style="position:relative;left:-85px;top:65px;">
                    </div>
                    <div style="margin-left:5%;">
                        <div>
                            <h1 style="font-size:60px;">InsightX</h1>
                        </div>
                        <div style="font-size:16px;margin-top:-2.4%;position:relative;right:-8.5%;">
                            <p>Beta</p>
                        </div>
                    </div>
                </span>
                <div class="d-none d-md-block"><br />
                    <nuxt-link to="/login"><button class="btn-fil-blue" variant="warning" style="padding-right:30px; padding-left:30px;">Login</button></nuxt-link>
                    <nuxt-link to="/signup"><button class="btn-fil-blue2" variant="info" style="padding-right:30px; padding-left:30px;">Signup</button></nuxt-link>
                </div>
                <div class="d-block d-md-none"><br />
                    <nuxt-link to="/login"><button class="btn-fil-blue" variant="warning" style="padding-right:30px; padding-left:30px;">Login</button></nuxt-link>
                </div>
            </div>
        </b-jumbotron>
    </div>
</template>



<script>
export default {
        layout: 'default',
        data() {
            return {

            }
        },
        methods: {

        },
        beforeMount () {


        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>