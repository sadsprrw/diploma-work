import { Module, Mutation, VuexModule } from 'vuex-module-decorators';


@Module({
    namespaced: true
})
export default class UserModule extends VuexModule {

    private selectedSong: any;
    private calculatedResults: any;
    private isLoading: boolean;

    @Mutation
    setIsLoading(state: boolean) {
        this.isLoading = state;
    }

    @Mutation
    setSelectedSong(song: any) {
       this.selectedSong = song;
    }

    @Mutation
    setCalculatedResults(results: any) {
        this.calculatedResults = results;
    }
}
