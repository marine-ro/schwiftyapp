<template>
    <form class="form" action="">
        <div class="form__body">
            <div class="form__row">
                <label class=" form__block form__block--1-2">
                    <span class="form__label form__label--top">name</span>
                    <input
                        class="form__control form__input"
                        type="text"
                        v-model="form.name"
                        placeholder="Enter name"
                    />
                </label>
                <label class=" form__block form__block--1-2">
                    <span class="form__label form__label--top">species</span>
                    <input
                        class="form__control form__input"
                        type="text"
                        v-model="form.species"
                        placeholder="Enter species" />
                </label>
                <label class=" form__block form__block--1-2">
                    <span class="form__label form__label--top">status</span>
                    <vSelect
                        class="form__control vs-custom--down"
                        :options="status"
                        label="choose status"
                        :reduce="(option) => option"
                        :searchable="false"
                        :clearable="true"
                        placeholder="choose status"
                        v-model="form.status"
                    >
                        <template slot="no-options">no</template>
                    </vSelect>
                </label>
                <label class=" form__block form__block--1-2">
                    <span class="form__label form__label--top">gender</span>
                    <vSelect
                        class="form__control vs-custom--down"
                        :options="gender"
                        ref="select"
                        :reduce="(option) => option"
                        :searchable="false"
                        :clearable="true"
                        placeholder="choose gender"
                        v-model="form.gender"
                    >
                        <template slot="no-options">no</template>
                    </vSelect>
                </label>
            </div>
        </div>
        <div class="form__footer">
            <uiButtonsGroup>
                <uiButton
                    type="submit"
                    kind="accent"
                    @click.prevent="applyFilter">
                    <template #btn-text>
                        find
                    </template>
                </uiButton>
                <uiButton
                    type="reset"
                    kind="basic"
                    @click.prevent="resetFilter">
                    <template #btn-text>
                        reset
                    </template>
                </uiButton>
            </uiButtonsGroup>
        </div>

    </form>
</template>
<script>
    import vSelect from 'vue-select';
    import uiButtonsGroup from '@/components/ui/btn/UIButtonsGroup';
    import uiButton from '@/components/ui/btn/UIButton';
    import {DEEP_CLONE} from '@/utils/constants';

    const status = ['alive', 'dead', 'unknown'];
    const gender = ['female', 'male', 'genderless', 'unknown'];

    export default {
        name: 'CharactersFilter',
        components: {
            vSelect,
            uiButton,
            uiButtonsGroup,
        },
        props: {
            formFilter: {
                type: Object,
                required: false,
                default: () => {},
            },
        },
        data() {
            return {
                status: status,
                gender: gender,
                form: {
                    name: '',
                    status: '',
                    species: '',
                    gender: '',
                },
            };
        },
        mounted() {
            //this.$refs.select.open = true;
        },
        created() {
            this.form = DEEP_CLONE(this.formFilter);
        },
        watch: {
            formFilter: {
                handler(newVal) {
                    this.form = newVal;
                },
                immediate: true,
            },
        },
        methods: {
            applyFilter() {
                this.$emit('applyFilter', this.form);
            },

            resetFilter() {
                this.$emit('resetFilter');
            },
        },
    };
</script>
<style lang="scss" scoped>
//@import "vue-select/src/scss/vue-select.scss";
.form {
    margin-bottom: 50px;
    &__row {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin-top: 50px;
        margin-bottom: 50px;
        margin-right: -15px;
    margin-left: -15px;
    }
    &__block {
        width: 100%;
        margin-bottom: 20px;
        &--1-2 {
            width: 50%;
            padding-right: 15px;
            padding-left: 15px;
        }
    }
    &__control {
        width: 100%;
        height: 40px;
        padding: 10px;
        position: relative;
        background-color: transparent;
        border-radius: 4px;
        border: 1px solid #373737;
        color: white;
        &.v-select {
            padding: 0;
        }
    }
    &__label {
        &--top {
            margin-bottom: 12px;
            display: inline-block;
        }
    }
}

</style>
