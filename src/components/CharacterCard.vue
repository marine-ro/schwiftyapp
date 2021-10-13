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

            <div class="item__body" :class="{ 'item__body--list': type === 'list' }">
                <div class="item__content">
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
                </div>
                <div class="item__action" :class="{ 'item__action--list': type === 'list' }">
                    <uiButtonsGroup :direction="getDirection">
                        <uiButton
                            kind="basic"
                            size="small"
                            @click.stop.prevent="$emit('deleteCharacter', card)"
                        >

                            <template #btn-text>
                                delete
                            </template>
                        </uiButton>

                        <uiButton
                            kind="basic"
                            size="small"
                            @click.prevent="$emit('showCharacter', card.id)">
                            <template #btn-text>
                                show
                            </template>
                        </uiButton>
                        <uiButton
                            kind="basic"
                            size="small"
                            @click.prevent="$emit('editCharacter', card.id)">
                            <template #btn-text>
                                edit
                            </template>
                        </uiButton>
                    </uiButtonsGroup>
                </div>

            </div>
        </li>
    </fragment>
</template>

<script>
    import {Fragment} from 'vue-fragment';
    import CharacterStatusIcon from '@/components/CharacterStatusIcon.vue';
    import uiButton from '@/components/ui/btn/UIButton';
    import uiButtonsGroup from '@/components/ui/btn/UIButtonsGroup';

    export default {
        name: 'CharacterCard',
        components: {
            Fragment,
            CharacterStatusIcon,
            uiButton,
            uiButtonsGroup,
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
        computed: {
            getDirection() {
                return this.type === 'list' ? 'vertical' : 'horizontal';
            },
        },

    };
</script>
