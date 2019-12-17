<template>
    <v-col class="center-item" cols="12" sm="3">
        <v-card class="bg-white-fade"
        >
            <v-list class="bg-white-fade">
                <v-subheader>MENU LIST</v-subheader>
                    <v-list-item-group color="primary">
                    <v-list-item @click="$router.push('/forum')" >
                        <v-list-item-icon>
                        <v-icon>mdi-clock</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content style="text-align:left;">
                        <v-list-item-title>All Questions</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="$router.push('/questions')" >
                        <v-list-item-icon>
                        <v-icon>mdi-help-box</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content style="text-align:left;">
                        <v-list-item-title>My Questions</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="$router.push('/answers')" >
                        <v-list-item-icon>
                        <v-icon>mdi-forum</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content style="text-align:left;">
                        <v-list-item-title>My Answers</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
    </v-col>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped>

</style>
