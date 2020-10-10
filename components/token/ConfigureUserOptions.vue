<template>
  <div id="tickerSpaceConfig">
    <div class="border-set font-style wrapper">
       <div style="margin:5px; padding:10px;">
        <b-row>
            <b-col>
                <h5 class="title" style="margin-right:250px;">User Settings</h5>
                <div style="position: relative; top:-10px; float:right; padding-right: 15px;">
                    <b-btn class="btn btn-danger" v-on:click="change_options()">SAVE CHANGES</b-btn>
                </div>
            </b-col>
        </b-row>
        <br>
        <b-row>
            <b-col>
                <div class="mode token-text" style="display: inline-block;">
                    <p>Color Mode:</p>
                </div>
                <span style="padding-left:22%;">
                <div style="display: inline-block">
                    <label class="container">
                        <input type="radio" name="radio">
                        <span class="checkmark"></span>
                    </label>
                </div>
                <div style="display: inline-block">
                    <label class="container">
                        <input type="radio" name="radio">
                        <span class="checkmark2"></span>
                    </label>
                </div>
                <div style="display: inline-block">
                    <label class="container">
                        <input type="radio" name="radio">
                        <span class="checkmark3"></span>
                    </label>
                </div>
                </span>
            </b-col>
        </b-row>
        <br>
                <b-row>
            <b-col>
                <div class="mode token-text" style="display: inline-block">
                    <div>Toggle Ticker Visibility:</div>
                </div>
            </b-col>
            <b-col class="tickerButtons"> 
                <span>
                <div style="display: inline-block">
                    <button v-if="this.$store.state.localStorage.tickerButtonFill == 'off'" class="btn-fil-blue-filled  float-left" style="margin-left:-5%;margin-right:20px;" v-on:click="toggleBottomTicker('off')">Hidden</button>
                  <button v-if="this.$store.state.localStorage.tickerButtonFill != 'off'" class="btn-fil-blue  float-left" style="margin-left:-5%;margin-right:20px;" v-on:click="toggleBottomTicker('off')">Hidden</button>
                </div>
                <div style="display: inline-block"> 
                    <button v-if="this.$store.state.localStorage.tickerButtonFill == 'big'" class="btn-fil-blue-filled  float-left" style="margin-left:-5%;margin-right:20px;" v-on:click="toggleBottomTicker('big')">Detailed</button>
                  <button v-if="this.$store.state.localStorage.tickerButtonFill != 'big'" class="btn-fil-blue  float-left" style="margin-left:-5%;margin-right:20px;" v-on:click="toggleBottomTicker('big')">Detailed</button>
                </div>
                <div style="display: inline-block">
                    <button v-if="$store.state.localStorage.tickerButtonFill == 'mini'" class="btn-fil-blue-filled  float-left" style="margin-left:-5%;margin-right:20px;" v-on:click="toggleBottomTicker('mini')">Minimized</button>
                  <button v-if="$store.state.localStorage.tickerButtonFill != 'mini'" class="btn-fil-blue  float-left" style="margin-left:-5%;margin-right:20px;" v-on:click="toggleBottomTicker('mini')">Minimized</button>
                </div>
                </span>
            </b-col>
        </b-row>
        <br>
        <b-row>
            <b-col>
                <div class="mode token-text" style="display: inline-block">
                    <div>Hide coins worth below:</div>
                </div>
            </b-col>
            <b-col>
                <b-form-select size="sm" class="black-form" v-model="hideReference" :options="allhidechoices" />
            </b-col>
            <b-col>
                <b-form-input size="sm" class="black-form" v-model="hideAmount"></b-form-input>
            </b-col>
        </b-row>
        <br>
        <b-row>
            <b-col>
                <div class="mode token-text" style="display: inline-block">
                    <p>Timezone:</p>
                </div>
            </b-col>
            <b-col>
                <b-form-select class="black-form" size="sm" v-model="timezone" :options="alltimezones" />
            </b-col>
        </b-row>
        <br>
        <b-row>
            <b-col>
                <div class="mode token-text" style="display: inline-block">
                    <p>Performers Displayed:</p>
                </div>
            </b-col>
            <b-col>
                <b-form-select class="black-form" size="sm" v-model="performerAmount" :options="performerOptions" />
            </b-col>
        </b-row>
    </div>
    </div>
  </div>
</template>
<script>

    export default {
        data() {
            return {
                all_tokens: {
                    'user_token': '52342435234523452435234dsfgsdgr45624356gdfsgf'
                },
                buttonFill: this.$store.state.localStorage.tickerButtonFill,
                endpoint: this.$store.state.apiEndPoint,
                show: 'show',
                performerOptions: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                allfiats: ['USD', 'EUR', 'GBP', 'AUD', 'CAD'],
                allhidechoices: ['USD', 'EUR', 'GBP', 'AUD', 'CAD', 'BTC'],
                fiat: null,
                hideReference: null,
                hideAmount: null,
                performerAmount: null,
                theme: null,
                targets: null,
                timezone: 'Africa/Abidjan',
                alltimezones: ['Africa/Abidjan', 'Africa/Accra', 'Africa/Addis_Ababa', 'Africa/Algiers', 'Africa/Asmara', 'Africa/Asmera', 'Africa/Bamako', 'Africa/Bangui', 'Africa/Banjul', 'Africa/Bissau', 'Africa/Blantyre', 'Africa/Brazzaville', 'Africa/Bujumbura', 'Africa/Cairo', 'Africa/Casablanca', 'Africa/Ceuta', 'Africa/Conakry', 'Africa/Dakar', 'Africa/Dar_es_Salaam', 'Africa/Djibouti', 'Africa/Douala', 'Africa/El_Aaiun', 'Africa/Freetown', 'Africa/Gaborone', 'Africa/Harare', 'Africa/Johannesburg', 'Africa/Juba', 'Africa/Kampala', 'Africa/Khartoum', 'Africa/Kigali', 'Africa/Kinshasa', 'Africa/Lagos', 'Africa/Libreville', 'Africa/Lome', 'Africa/Luanda', 'Africa/Lubumbashi', 'Africa/Lusaka', 'Africa/Malabo', 'Africa/Maputo', 'Africa/Maseru', 'Africa/Mbabane', 'Africa/Mogadishu', 'Africa/Monrovia', 'Africa/Nairobi', 'Africa/Ndjamena', 'Africa/Niamey', 'Africa/Nouakchott', 'Africa/Ouagadougou', 'Africa/Porto-Novo', 'Africa/Sao_Tome', 'Africa/Timbuktu', 'Africa/Tripoli', 'Africa/Tunis', 'Africa/Windhoek', 'America/Adak', 'America/Anchorage', 'America/Anguilla', 'America/Antigua', 'America/Araguaina', 'America/Argentina/Buenos_Aires', 'America/Argentina/Catamarca', 'America/Argentina/ComodRivadavia', 'America/Argentina/Cordoba', 'America/Argentina/Jujuy', 'America/Argentina/La_Rioja', 'America/Argentina/Mendoza', 'America/Argentina/Rio_Gallegos', 'America/Argentina/Salta', 'America/Argentina/San_Juan', 'America/Argentina/San_Luis', 'America/Argentina/Tucuman', 'America/Argentina/Ushuaia', 'America/Aruba', 'America/Asuncion', 'America/Atikokan', 'America/Atka', 'America/Bahia', 'America/Bahia_Banderas', 'America/Barbados', 'America/Belem', 'America/Belize', 'America/Blanc-Sablon', 'America/Boa_Vista', 'America/Bogota', 'America/Boise', 'America/Buenos_Aires', 'America/Cambridge_Bay', 'America/Campo_Grande', 'America/Cancun', 'America/Caracas', 'America/Catamarca', 'America/Cayenne', 'America/Cayman', 'America/Chicago', 'America/Chihuahua', 'America/Coral_Harbour', 'America/Cordoba', 'America/Costa_Rica', 'America/Creston', 'America/Cuiaba', 'America/Curacao', 'America/Danmarkshavn', 'America/Dawson', 'America/Dawson_Creek', 'America/Denver', 'America/Detroit', 'America/Dominica', 'America/Edmonton', 'America/Eirunepe', 'America/El_Salvador', 'America/Ensenada', 'America/Fort_Nelson', 'America/Fort_Wayne', 'America/Fortaleza', 'America/Glace_Bay', 'America/Godthab', 'America/Goose_Bay', 'America/Grand_Turk', 'America/Grenada', 'America/Guadeloupe', 'America/Guatemala', 'America/Guayaquil', 'America/Guyana', 'America/Halifax', 'America/Havana', 'America/Hermosillo', 'America/Indiana/Indianapolis', 'America/Indiana/Knox', 'America/Indiana/Marengo', 'America/Indiana/Petersburg', 'America/Indiana/Tell_City', 'America/Indiana/Vevay', 'America/Indiana/Vincennes', 'America/Indiana/Winamac', 'America/Indianapolis', 'America/Inuvik', 'America/Iqaluit', 'America/Jamaica', 'America/Jujuy', 'America/Juneau', 'America/Kentucky/Louisville', 'America/Kentucky/Monticello', 'America/Knox_IN', 'America/Kralendijk', 'America/La_Paz', 'America/Lima', 'America/Los_Angeles', 'America/Louisville', 'America/Lower_Princes', 'America/Maceio', 'America/Managua', 'America/Manaus', 'America/Marigot', 'America/Martinique', 'America/Matamoros', 'America/Mazatlan', 'America/Mendoza', 'America/Menominee', 'America/Merida', 'America/Metlakatla', 'America/Mexico_City', 'America/Miquelon', 'America/Moncton', 'America/Monterrey', 'America/Montevideo', 'America/Montreal', 'America/Montserrat', 'America/Nassau', 'America/New_York', 'America/Nipigon', 'America/Nome', 'America/Noronha', 'America/North_Dakota/Beulah', 'America/North_Dakota/Center', 'America/North_Dakota/New_Salem', 'America/Ojinaga', 'America/Panama', 'America/Pangnirtung', 'America/Paramaribo', 'America/Phoenix', 'America/Port-au-Prince', 'America/Port_of_Spain', 'America/Porto_Acre', 'America/Porto_Velho', 'America/Puerto_Rico', 'America/Punta_Arenas', 'America/Rainy_River', 'America/Rankin_Inlet', 'America/Recife', 'America/Regina', 'America/Resolute', 'America/Rio_Branco', 'America/Rosario', 'America/Santa_Isabel', 'America/Santarem', 'America/Santiago', 'America/Santo_Domingo', 'America/Sao_Paulo', 'America/Scoresbysund', 'America/Shiprock', 'America/Sitka', 'America/St_Barthelemy', 'America/St_Johns', 'America/St_Kitts', 'America/St_Lucia', 'America/St_Thomas', 'America/St_Vincent', 'America/Swift_Current', 'America/Tegucigalpa', 'America/Thule', 'America/Thunder_Bay', 'America/Tijuana', 'America/Toronto', 'America/Tortola', 'America/Vancouver', 'America/Virgin', 'America/Whitehorse', 'America/Winnipeg', 'America/Yakutat', 'America/Yellowknife', 'Antarctica/Casey', 'Antarctica/Davis', 'Antarctica/DumontDUrville', 'Antarctica/Macquarie', 'Antarctica/Mawson', 'Antarctica/McMurdo', 'Antarctica/Palmer', 'Antarctica/Rothera', 'Antarctica/South_Pole', 'Antarctica/Syowa', 'Antarctica/Troll', 'Antarctica/Vostok', 'Arctic/Longyearbyen', 'Asia/Aden', 'Asia/Almaty', 'Asia/Amman', 'Asia/Anadyr', 'Asia/Aqtau', 'Asia/Aqtobe', 'Asia/Ashgabat', 'Asia/Ashkhabad', 'Asia/Atyrau', 'Asia/Baghdad', 'Asia/Bahrain', 'Asia/Baku', 'Asia/Bangkok', 'Asia/Barnaul', 'Asia/Beirut', 'Asia/Bishkek', 'Asia/Brunei', 'Asia/Calcutta', 'Asia/Chita', 'Asia/Choibalsan', 'Asia/Chongqing', 'Asia/Chungking', 'Asia/Colombo', 'Asia/Dacca', 'Asia/Damascus', 'Asia/Dhaka', 'Asia/Dili', 'Asia/Dubai', 'Asia/Dushanbe', 'Asia/Famagusta', 'Asia/Gaza', 'Asia/Harbin', 'Asia/Hebron', 'Asia/Ho_Chi_Minh', 'Asia/Hong_Kong', 'Asia/Hovd', 'Asia/Irkutsk', 'Asia/Istanbul', 'Asia/Jakarta', 'Asia/Jayapura', 'Asia/Jerusalem', 'Asia/Kabul', 'Asia/Kamchatka', 'Asia/Karachi', 'Asia/Kashgar', 'Asia/Kathmandu', 'Asia/Katmandu', 'Asia/Khandyga', 'Asia/Kolkata', 'Asia/Krasnoyarsk', 'Asia/Kuala_Lumpur', 'Asia/Kuching', 'Asia/Kuwait', 'Asia/Macao', 'Asia/Macau', 'Asia/Magadan', 'Asia/Makassar', 'Asia/Manila', 'Asia/Muscat', 'Asia/Nicosia', 'Asia/Novokuznetsk', 'Asia/Novosibirsk', 'Asia/Omsk', 'Asia/Oral', 'Asia/Phnom_Penh', 'Asia/Pontianak', 'Asia/Pyongyang', 'Asia/Qatar', 'Asia/Qyzylorda', 'Asia/Rangoon', 'Asia/Riyadh', 'Asia/Saigon', 'Asia/Sakhalin', 'Asia/Samarkand', 'Asia/Seoul', 'Asia/Shanghai', 'Asia/Singapore', 'Asia/Srednekolymsk', 'Asia/Taipei', 'Asia/Tashkent', 'Asia/Tbilisi', 'Asia/Tehran', 'Asia/Tel_Aviv', 'Asia/Thimbu', 'Asia/Thimphu', 'Asia/Tokyo', 'Asia/Tomsk', 'Asia/Ujung_Pandang', 'Asia/Ulaanbaatar', 'Asia/Ulan_Bator', 'Asia/Urumqi', 'Asia/Ust-Nera', 'Asia/Vientiane', 'Asia/Vladivostok', 'Asia/Yakutsk', 'Asia/Yangon', 'Asia/Yekaterinburg', 'Asia/Yerevan', 'Atlantic/Azores', 'Atlantic/Bermuda', 'Atlantic/Canary', 'Atlantic/Cape_Verde', 'Atlantic/Faeroe', 'Atlantic/Faroe', 'Atlantic/Jan_Mayen', 'Atlantic/Madeira', 'Atlantic/Reykjavik', 'Atlantic/South_Georgia', 'Atlantic/St_Helena', 'Atlantic/Stanley', 'Australia/ACT', 'Australia/Adelaide', 'Australia/Brisbane', 'Australia/Broken_Hill', 'Australia/Canberra', 'Australia/Currie', 'Australia/Darwin', 'Australia/Eucla', 'Australia/Hobart', 'Australia/LHI', 'Australia/Lindeman', 'Australia/Lord_Howe', 'Australia/Melbourne', 'Australia/NSW', 'Australia/North', 'Australia/Perth', 'Australia/Queensland', 'Australia/South', 'Australia/Sydney', 'Australia/Tasmania', 'Australia/Victoria', 'Australia/West', 'Australia/Yancowinna', 'Brazil/Acre', 'Brazil/DeNoronha', 'Brazil/East', 'Brazil/West', 'CET', 'CST6CDT', 'Canada/Atlantic', 'Canada/Central', 'Canada/Eastern', 'Canada/Mountain', 'Canada/Newfoundland', 'Canada/Pacific', 'Canada/Saskatchewan', 'Canada/Yukon', 'Chile/Continental', 'Chile/EasterIsland', 'Cuba', 'EET', 'EST', 'EST5EDT', 'Egypt', 'Eire', 'Etc/GMT', 'Etc/GMT+0', 'Etc/GMT+1', 'Etc/GMT+10', 'Etc/GMT+11', 'Etc/GMT+12', 'Etc/GMT+2', 'Etc/GMT+3', 'Etc/GMT+4', 'Etc/GMT+5', 'Etc/GMT+6', 'Etc/GMT+7', 'Etc/GMT+8', 'Etc/GMT+9', 'Etc/GMT-0', 'Etc/GMT-1', 'Etc/GMT-10', 'Etc/GMT-11', 'Etc/GMT-12', 'Etc/GMT-13', 'Etc/GMT-14', 'Etc/GMT-2', 'Etc/GMT-3', 'Etc/GMT-4', 'Etc/GMT-5', 'Etc/GMT-6', 'Etc/GMT-7', 'Etc/GMT-8', 'Etc/GMT-9', 'Etc/GMT0', 'Etc/Greenwich', 'Etc/UCT', 'Etc/UTC', 'Etc/Universal', 'Etc/Zulu', 'Europe/Amsterdam', 'Europe/Andorra', 'Europe/Astrakhan', 'Europe/Athens', 'Europe/Belfast', 'Europe/Belgrade', 'Europe/Berlin', 'Europe/Bratislava', 'Europe/Brussels', 'Europe/Bucharest', 'Europe/Budapest', 'Europe/Busingen', 'Europe/Chisinau', 'Europe/Copenhagen', 'Europe/Dublin', 'Europe/Gibraltar', 'Europe/Guernsey', 'Europe/Helsinki', 'Europe/Isle_of_Man', 'Europe/Istanbul', 'Europe/Jersey', 'Europe/Kaliningrad', 'Europe/Kiev', 'Europe/Kirov', 'Europe/Lisbon', 'Europe/Ljubljana', 'Europe/London', 'Europe/Luxembourg', 'Europe/Madrid', 'Europe/Malta', 'Europe/Mariehamn', 'Europe/Minsk', 'Europe/Monaco', 'Europe/Moscow', 'Europe/Nicosia', 'Europe/Oslo', 'Europe/Paris', 'Europe/Podgorica', 'Europe/Prague', 'Europe/Riga', 'Europe/Rome', 'Europe/Samara', 'Europe/San_Marino', 'Europe/Sarajevo', 'Europe/Saratov', 'Europe/Simferopol', 'Europe/Skopje', 'Europe/Sofia', 'Europe/Stockholm', 'Europe/Tallinn', 'Europe/Tirane', 'Europe/Tiraspol', 'Europe/Ulyanovsk', 'Europe/Uzhgorod', 'Europe/Vaduz', 'Europe/Vatican', 'Europe/Vienna', 'Europe/Vilnius', 'Europe/Volgograd', 'Europe/Warsaw', 'Europe/Zagreb', 'Europe/Zaporozhye', 'Europe/Zurich', 'GB', 'GB-Eire', 'GMT', 'GMT+0', 'GMT-0', 'GMT0', 'Greenwich', 'HST', 'Hongkong', 'Iceland', 'Indian/Antananarivo', 'Indian/Chagos', 'Indian/Christmas', 'Indian/Cocos', 'Indian/Comoro', 'Indian/Kerguelen', 'Indian/Mahe', 'Indian/Maldives', 'Indian/Mauritius', 'Indian/Mayotte', 'Indian/Reunion', 'Iran', 'Israel', 'Jamaica', 'Japan', 'Kwajalein', 'Libya', 'MET', 'MST', 'MST7MDT', 'Mexico/BajaNorte', 'Mexico/BajaSur', 'Mexico/General', 'NZ', 'NZ-CHAT', 'Navajo', 'PRC', 'PST8PDT', 'Pacific/Apia', 'Pacific/Auckland', 'Pacific/Bougainville', 'Pacific/Chatham', 'Pacific/Chuuk', 'Pacific/Easter', 'Pacific/Efate', 'Pacific/Enderbury', 'Pacific/Fakaofo', 'Pacific/Fiji', 'Pacific/Funafuti', 'Pacific/Galapagos', 'Pacific/Gambier', 'Pacific/Guadalcanal', 'Pacific/Guam', 'Pacific/Honolulu', 'Pacific/Johnston', 'Pacific/Kiritimati', 'Pacific/Kosrae', 'Pacific/Kwajalein', 'Pacific/Majuro', 'Pacific/Marquesas', 'Pacific/Midway', 'Pacific/Nauru', 'Pacific/Niue', 'Pacific/Norfolk', 'Pacific/Noumea', 'Pacific/Pago_Pago', 'Pacific/Palau', 'Pacific/Pitcairn', 'Pacific/Pohnpei', 'Pacific/Ponape', 'Pacific/Port_Moresby', 'Pacific/Rarotonga', 'Pacific/Saipan', 'Pacific/Samoa', 'Pacific/Tahiti', 'Pacific/Tarawa', 'Pacific/Tongatapu', 'Pacific/Truk', 'Pacific/Wake', 'Pacific/Wallis', 'Pacific/Yap', 'Poland', 'Portugal', 'ROC', 'ROK', 'Singapore', 'Turkey', 'UCT', 'US/Alaska', 'US/Aleutian', 'US/Arizona', 'US/Central', 'US/East-Indiana', 'US/Eastern', 'US/Hawaii', 'US/Indiana-Starke', 'US/Michigan', 'US/Mountain', 'US/Pacific', 'US/Samoa', 'UTC', 'Universal', 'W-SU', 'WET', 'Zulu']
            }
        },
        mounted(){
        },
        methods: {
            toggleBottomTicker(val){
              this.$store.commit('localStorage/toggleBottomTickerComponent', val);
              //this.$router.push('/account')
            },
            change_options: function() {
                var token = sessionStorage.getItem('token')
                var header = {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(token + ':unused')
                }
                //let that = this
                var that = this
                var url = that.endpoint + "edituseroptions"
                fetch(url, {
                    method: "POST",
                    mode: 'cors',
                    headers: header,
                    body: JSON.stringify({
                        "timezone": that.timezone,
                        "hideAmount": that.hideAmount,
                        "hideReference": that.hideReference,
                        "fiat": that.fiat,
                        "theme": that.theme,
                        "performerAmount": that.performerAmount,
                        "targets": that.targets
                    })
                }).then(function(response) {
                    const contentType = response.headers.get('Content-Type')
                    if (contentType && contentType.indexOf('application/json') !== -1) {
                        return response.json()
                    } else {
                        that.$router.push('/')
                    }
                }).then(function(JSONresponse) {
                    that.$toast.success(JSONresponse.result, {icon: 'check'} )
                })
            },
        },
        props: ['tokens', 'userOptions'],
        beforeMount() {
            this.timezone = this.userOptions.timezone
            this.fiat = this.userOptions.fiat
            this.hideAmount = this.userOptions.hideAmount
            this.hideReference = this.userOptions.hideReference
            this.timezone = this.userOptions.timezone
            this.performerAmount = this.userOptions.performerAmount
            this.targets = this.userOptions.targets
        }
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
   .border-set {
        border-radius: 5px;
        height: 30rem;
    }
    .pad {
        padding-left: 30px;
    }

    .btn-primary {
        background: #345278 !important;
        border: none;
    }

    .button-pad {
        position: relative;
        top: 10px;
        left: 100px;
    }

    .blue-text {
        color: #7648eb;
        font-family: 'Montserrat', sans-serif;
        font-weight: bolder;

    }

    .font-style {
        font-family: 'Montserrat', sans-serif;
    }

    .token-text {
        font-size: 12px;
    }

    .token-text2 {
        font-size: 11px;
        letter-spacing: 2px;
        float: left;
    }

    .white {
        color: white;
    }

    .white-hr {
        background: rgb(117, 112, 112);
        width: 80%;
    }

 
    /* Customize the label (the container) */
    .container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default radio button */
    .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Create a custom radio button */
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: rgb(93, 180, 252);
        border-radius: 50%;
    }

    .checkmark2 {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: rgb(93, 180, 252);
        border-radius: 50%;
    }

    .checkmark3 {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: rgb(93, 180, 252);
        border-radius: 50%;
    }

    /* When the radio button is checked, add a blue background */
    .container input:checked~.checkmark {
        background-color: rgb(38, 41, 43);
    }

    .container input:checked~.checkmark2 {
        background-color: rgb(255, 255, 255);
    }

    .container input:checked~.checkmark3 {
        background-color: rgb(160, 32, 32);
    }

    /* Create the indicator (the dot/circle - hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    .checkmark:after2 {
        content: "";
        position: absolute;
        display: none;
    }

    .checkmark:after3 {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the indicator (dot/circle) when checked */
    .container input:checked~.checkmark:after {
        display: block;
    }

    /* Show the indicator (dot/circle) when checked */
    .container input:checked~.checkmark2:after {
        display: block;
    }

    /* Show the indicator (dot/circle) when checked */
    .container input:checked~.checkmark3:after {
        display: block;
    }

    .mode {
        float: left;
        margin-left: 10px;
        margin-top: 7px;
    }

    .black-form {
        background: #1a1a1a;
        color: white;
    }
    .tickerButtons{
        margin-left:-150px;
        font-size: 12px;
    }
        .wrapper {
        height: 482px !important;
    }
</style>