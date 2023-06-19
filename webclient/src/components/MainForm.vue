<template>
 <div class="form-wrapper">
   <div class="icon"><i class="icon fa-compact-disc fa-lg"/></div>
   <div class="header"> Song Recommendations </div>
   <div class="description">Give us your favorite tracks and we’ll recommend you a Spotify playlist with songs that you’ll love.</div>
   <div class="input">
     <FormInput  @show="onShowSearchResults"/>
     <SRDropdown
         v-if="showDropdown"
         v-model="showDropdown"
         :min-width="379"
         :max-height="250"
         :top-indent="0"
         bottom
         :show-close-button="false"
     >
       <template v-slot:body>
         <div class="song_card" v-for="song in showedResults" :key="song.id" @click="recommendSong(song)">
           <div class="song_name"> {{ song.name }} </div>
           <div class="song_artist"> {{ parseArtists(song.artists) }} </div>
         </div>
       </template>
     </SRDropdown>
   </div>
 </div>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import Vue from "vue";
import { namespace } from 'vuex-class';
import FormInput from "@/components/FormInput.vue";
import HttpServiceInstance from "@/services/HTTP/HttpService";

const userModule = namespace('UserModule');
@Component({
  name: "MainForm",
  components: { FormInput },
})
export default class MainForm extends Vue {
  @userModule.State readonly selectedSong: any;
  @userModule.State readonly calculatedResults: any;

  @userModule.Mutation setSelectedSong: (song: any) => void;
  @userModule.Mutation setIsLoading: (state: boolean) => void;
  @userModule.Mutation setCalculatedResults: (results: any) => void;

  private showDropdown = false;
  private showedResults = [];

  parseArtists(artists: any[]) {
    return artists.map((a) => a.name).join(', ');
  }

  onShowSearchResults(results: any) {
    this.showedResults = results;
    this.showDropdown = true;
  }

  async recommendSong(song: any) {
    this.setSelectedSong(song);
    this.setIsLoading(true);
    await this.$router.push({ name: 'ResultsPage', params: {} })
    const res: any = await HttpServiceInstance.main.recommendSong([song]);
    this.setCalculatedResults(res.data);
    this.setIsLoading(false);
  }
}
</script>

<style scoped lang="scss">

  .form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 200px;
  }

  .input {
    position: relative;
  }

  .header {
    font-size: 24px;
    color: white;
    padding-top: 10px;
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

  .song_card {
    padding: 5px 10px;
    border-radius: 5px;
    &:hover {
      background-color: #27C97B;
      color: black;
    }
  }
</style>