<template>
  <f7-page ptr @ptr:refresh="refresh">
    <f7-navbar>
  <f7-nav-title>Macau Carpark Info</f7-nav-title>
  <f7-nav-right>
    <f7-link @click="locateUser" v-if="!isLocating">定位</f7-link>
    <f7-preloader v-else></f7-preloader>
  </f7-nav-right>
</f7-navbar>
    <f7-block>
        <f7-list v-if="carparkData.length > 0 ">
            <f7-list-item class="item-link"
             @click="()=> { $f7router.navigate('/info',{ props: {carpark: carpark} }) } "
             :key="index" :title="carpark.name" :footer="`🚙 ${carpark.car} 🛵 ${carpark.motor}`" v-for="(carpark, index) in carparkData">
                <f7-icon slot="media" icon="demo-list-icon"></f7-icon>
            </f7-list-item>
        </f7-list>
        <f7-block v-else class="text-align-center">
            <f7-preloader :size="28" ></f7-preloader>
        </f7-block>
    </f7-block>
  </f7-page>
</template>

<script>
export default {
    data() {
        return {
            carparkData : [],
            location: {
              lat: null,
              lng: null,
            },
            isLocating: false,
        }
    },
    watch: {
        combineLocations() {
            this.fetchData().then((data) => {
              this.carparkData = data
              this.isLocating = false
            })
            .catch(() => {        
                this.$f7.dialog.alert('在獲取資料時發生錯誤，請重試。', '錯誤')
            });
        }
    },
    computed: {
        combineLocations() {
            return this.location.lat && this.location.lng;
        }
    },
created() {
  this.fetchData()
    .then((data) => {
      this.carparkData = data
      this.isLocating = false
    })
    .catch(() => {        
        this.$f7.dialog.alert('在獲取資料時發生錯誤，請重試。', '錯誤')
    });
},
  methods: {
refresh(done) {
  this.fetchData()
    .then((data) => {
      this.carparkData = data
      this.isLocating = false
      done()
    })
    .catch(() => {        
        this.$f7.dialog.alert('在獲取資料時發生錯誤，請重試。', '錯誤')
    });
},
    fetchData() {
      return new Promise((resolve, reject) => {
        this.isLocating = true
        //this.carparkData = []
        let url = `https://ios-dev.shortcutsapi.com/parking-info/parking-info-macau-ios-dev`

        if (this.location.lat != null && this.location.lng != null) {
            url += `?lat=${this.location.lat}&lng=${this.location.lng}`
        }


        fetch(url)
          .then((res) => {
            res.json().then((json) => {
              resolve(json.data)
            })
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    locateUser() {
      navigator.geolocation.getCurrentPosition((location) => {
        // eslint-disable-next-line no-console
        console.log(location)
        this.location = {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        }
      });
    }
  }
}
</script>

<style>
.list .item-footer {
  color: #333;
  margin-top: .5em;
}
</style>