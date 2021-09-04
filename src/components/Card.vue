<template>
    <fragment>
        <li
            class="item"
            :class="[type === 'list' ? 'item--full' : 'item--grid']"
        >
            <div class="item__header">
                <img
                    class="item__img"
                    :src="card.image"
                    :class="[type === 'list' ? 'item__img--full' : 'item__img--grid']"
                />
                <h2
                    v-if="type === 'grid'"
                    class="item__title"
                    :class="{ 'item__title--grid': type === 'grid' }"
                >
                    {{card.name}}
                </h2>
            </div>

            <div class="item__body">
                <h2
                    v-if="type === 'list'"
                    class="item__title"
                    :class="{ 'item__title--list': type === 'list' }"
                >
                    {{card.name}}
                </h2>

                <span class="status">
                    <CharacterStatusIcon :status="card.status"/>
                    {{card.status}} - {{card.species}}
                </span>
                <p>
                    Last known location:
                    {{card.location.name}}
                </p>
                <p>{{card.gender}}</p>
                <!-- <p>
                    First seen in:
                    {{firstEpisode.name}} - {{firstEpisode.episode}}
                </p> -->
            </div>
        </li>
    </fragment>
</template>

<script>
    import {Fragment} from 'vue-fragment';
    import CharacterStatusIcon from '@/components/CharacterStatusIcon.vue';

    export default {
        name: 'Card',
        components: {
            Fragment,
            CharacterStatusIcon,
        },
        props: {
            card: {
                type: Object,
                required: true,
            },
            type: {
                type: String,
                required: true,
                validator(value) {
                    return ['list', 'grid'].indexOf(value) !== -1;
                },
            },
        },
        data() {
            return {
                firstEpisode: Object,
            };
        },

    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin: 40px 0 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
.item {
    margin-bottom: 30px;
    margin-left: 0;
    &--full {
        display: flex;
        align-items: flex-start;
        width: 100%;
        & .item__header {
            width: 15%;
        }
    }
    &--grid {
        flex: 1 0 auto;
        max-width: 200px;
        &:not(:last-child) {
            margin-right: 30px;
        }
    & .item__header {
        width: 100%;
        }
    }
}
.item__header {
    position: relative;

}
.item__title {
    margin-top: 0;
    &--full {
        margin-bottom: 20px;
    }
    &--grid {
        margin-top: 20px;
    }
}
.item__img {
    width: 100%;
}
.item__body {
    padding: 20px;
}
.status {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    text-transform: capitalize;
}

</style>
