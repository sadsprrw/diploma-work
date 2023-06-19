<template>
  <div class="results-wrapper">
    <div v-if="!isLoading" class="results">
      <div class="head" @click="goBack">
        <div class="icon"><i class="icon fa-compact-disc fa-lg"/></div>
        <div class="header"> Song Recommendations </div>
      </div>
      <div class="text">
        <div class="label"> Song recommended based on: </div>
        <div class="song_name"> {{ selectedSong.name }} by {{ parseArtists(selectedSong.artists) }} </div>
      </div>
      <div class="table-headers">
        <div>Track</div>
        <div>Artist</div>
        <div>Time</div>
      </div>
      <div class="results-items" v-for="song in calculatedResults" :key="song.id">
        <div style="display: flex; align-items: center; min-height: 30px">
          <div class="play"><i class="play-icon"/></div>
          <div style="padding-left: 10px">{{ song.name }} </div>
        </div>
        <div >{{ parseArtistsSP(song.artists) }}</div>
        <div >{{ parseDuration(song.duration_ms) }}</div>
      </div>
    </div>
    <SRLoader v-else :is-full-page="true" :is-loading=isLoading />
  </div>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import Vue from "vue";
import {namespace} from "vuex-class";

const userModule = namespace('UserModule');
@Component({
  name: "Results",
})
export default class Results extends Vue {

  @userModule.State readonly selectedSong: any;
  @userModule.State readonly calculatedResults: any;
  @userModule.State readonly isLoading: boolean;

  @userModule.Mutation setSelectedSong: (song: any) => void;
  @userModule.Mutation setCalculatedResults: (results: any) => void;

  parseArtists(artists: any[]) {
    return artists.map((a) => a.name).join(', ');
  }

  parseArtistsSP(artists: string) {
    const punct = /['\[\]]/g;
    return artists.replace(punct, "");
  }

  parseDuration(duration: number) {
    let minutes = Math.floor(duration / 60000);
    let seconds = ((duration % 60000) / 1000).toFixed(0);
    return minutes + ":" + (parseFloat(seconds) < 10 ? '0' : '') + seconds;
  }

  async goBack() {
    await this.$router.push({ name: 'MainPage', params: {} })
    this.setSelectedSong(null);
    this.setCalculatedResults([]);
  }

}
</script>

<style scoped lang="scss">

.results-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
}

.play {
  border-radius: 50%;
  background-color:  #9a9797;
  min-height: 30px;
  min-width: 30px;
  max-height: 30px;
  max-width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.play-icon {
  height: 20px;
  width: 20px;
  display: unset;
  background-image: url("../../public/play.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.results {
  display: flex;
  flex-direction: column;
  min-width: 1000px;
  padding-top: 20px;

}

.input {
  position: relative;
}

.head {
  display: flex;
  cursor: pointer;
}

.text {
  margin-top: 100px;
}

.label {
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 200;
  color: #9a9797;
  padding-top: 10px;
  padding-left: 10px;
}

.song_name {
  font-size: 36px;
  color: white;
  padding-top: 10px;
  padding-left: 10px;
}

.header {
  font-size: 24px;
  color: white;
  padding-top: 10px;
  padding-left: 10px;
}

.icon {
  width: 40px;
  height: 40px;
  display: unset;
  background-image: url("../../public/compact-disc-solid.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.description {
  font-size: 16px;
  color: darken(white, 50%);
  max-width: 400px;
  text-align: center;
  padding: 50px 10px;
}

.results-items {
  display: grid;
  grid-template-columns: 470px 470px 30px;
  align-items: center;
  padding-left: 10px;
  color: white;
  padding-bottom: 10px;
  padding-top: 10px;
  font-size: 18px;
}

.table-headers {
  margin-top: 50px;
  display: grid;
  grid-template-columns: 470px 470px 30px;
  padding-left: 10px;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 200;
  color: #9a9797;
}

.song_card {
  padding: 5px 10px;
  border-radius: 5px;
  &:hover {
    background-color: #27C97B;
    color: black;
  }
}
</style>