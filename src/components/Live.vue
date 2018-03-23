<template>
  <div>
    <div class="full-width" id="liveticker-tickertext">
      <h2>LIVE</h2>
      <div class="filter">
        <section class="select-wrapper filter-sportart single-filter">
          <label class="custom-select">
            Filtern nach Sportart:
            <select class="sportsTypeFilter">
              <option selected="selected" value="0">Alle Sportarten</option>
              <option value="1">Badminton</option>
              <option value="2">Baseball</option>
            </select>
          </label>
        </section>
      </div>
      <div class="content_container">
        <message v-for="message in filteredMessages"
                 :message="message"
                 :key="message.id"/>
        <div class="text-box-highlights placeholder">
          <div class="left">
            <div class="sportart"></div>
            <div class="zeit"><span></span></div>
          </div>
          <div class="">
            <div class="text">
              <p class="title"></p>
              <span>Es wurden keine passenden Einträge gefunden</span>
            </div>
          </div>
          <div class=""></div>
        </div>
        <!--- text-box-highlights ende -->
      </div>
    </div>

    <div class="paging-container" id="liveticker-tickertext-paging">
      <a href="javascript:void(0)" class="boxarrow right">mehr anzeigen <span><img src="./../assets/arrow-right.png" alt="next" /></span></a>
    </div>
  </div>
</template>

<script>
    import Loader from '@/js/Loader';
    import Parser from '@/js/Parser';
    import Message from '@/components/Message';

    export default {
        name: "live",
        components: { Message },
        data() {
            return {
                intervalId: undefined,
                loader: undefined,
                parser: undefined,
                messages: [],
                selectedSportsType: undefined,
                url: '/static/feeds/messages.json'
            }
        },
        created() {
            this.loader = new Loader();
            this.parser = new Parser();
            this.refreshTicker();
            this.intervalId = setInterval(this.refreshTicker, 10 * 1000);
        },
        destroyed() {
            clearInterval(this.intervalId);
        },
        methods: {
            refreshTicker() {
                this.loader.load(this.url)
                    .then(json => {
                        this.messages = this.parser.parse(json);
                    });
            }
        },
        computed: {
            sportsTypes() {
                if(!this.messages.length) {
                    return [];
                }

                let map = new Map();
                this.messages.map(message => {
                    if(message.sportsTypeId && !map.has(message.sportsTypeId)) {
                        map.set(parseInt(message.sportsTypeId), message.sportsType);
                    }

                });

                return Array.from(map);
            },
            filteredMessages() {
                if(typeof this.selectedSportsType === 'undefined') {
                    return this.messages;
                }

                return this.messages
                    .filter(message => {
                        return message.sportsTypeId == this.selectedSportsType;
                    })
            }
        }
    }
</script>