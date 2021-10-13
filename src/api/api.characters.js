import {STORAGE} from '@/api/api.storage';
import {chunk} from '@/utils/chunk';
import {filterArray} from '@/utils/helpers';
const requestDefault = {
    name: '',
    status: '',
    species: '',
    gender: '',
    page: 1,
};
class FavoriteCharacterApiService {
    constructor() {
        this._characters = [];
        this._deletedCharacters = [];
        this._filter = {};
        this._sort = {};
        this._pagination = {};
        this.pageSize = 3;
    }

    init() {
        this._characters = this.getCharacters(requestDefault);
    }

    decomposeRequest(request) {
        const req = request;
        this._sort = req.sort;
        this._pagination.page = req.page;
        delete req.sort;
        delete req.page;
        this._filter = req;
    }

    getAllCharacters() {
        return new Promise((resolve) => {
            const storage = STORAGE.getItem('characters') || [];
            this._characters = storage;
            resolve(storage);
        });
    }

    getCharacters(request) {
        this.decomposeRequest(request);

        return new Promise((resolve) => {
            this.getAllCharacters()
                .then((data) => {
                    const filtered = filterArray(data, this._filter);
                    return filtered;
                })
                .then((data) => {
                    const filtered = this._setPagination(data);
                    return {
                        characters: filtered,
                        pagination: this._pagination,
                    };
                })
                .then((data) => {
                    resolve(data);
                });
        });
    }

    getCharacter(request) {
        return new Promise((resolve) => {
            const data = this._characters.find((character) => character.id === request.id);
            resolve(data);
        });
    }

    addCharacters(request) {
        return new Promise((resolve) => {
            this._characters = [...this._characters, ...request.characters];
            STORAGE.setItem('characters', this._characters);
            resolve();
        });
    }

    editCharacter(request) {
        return new Promise((resolve) => {
            const idx = this._characters.findIndex((character) => character.id === request.character.id);
            this._characters[idx] = request.character;
            STORAGE.setItem('characters', this._characters);
            resolve();
        });
    }

    deleteCharacter(request) {
        return new Promise((resolve) => {
            const idx = this._characters.findIndex((character) => character.id === request.id);
            this._deletedCharacters = [...this._deletedCharacters, this._characters[idx]];
            this._characters.splice(idx, 1);
            STORAGE.setItem('deletedCharacters', this._deletedCharacters);
            STORAGE.setItem('characters', this._characters);
            resolve();
        });
    }

    getDeletedCharacters() {
        return new Promise((resolve) => {
            const storage = STORAGE.getItem('deletedCharacters') || [];
            this._deletedCharacters = storage;
            resolve(storage);
        });
    }

    deleteCharacterForever() {
        return new Promise((resolve) => {
            STORAGE.removeItem('deletedCharacters');
            this._deletedCharacters = null;
            resolve();
        });
    }

    _setPagination(data) {
        const chunkData = this._chunkData(data);
        this._pagination.count = chunkData.length;
        return chunkData[this._pagination.page - 1] || chunkData[0];
    }

    _chunkData(solars) {
        return chunk(solars, this.pageSize);
    }

    _parseBool(val) {
        return val === true || val === 'true';
    }
}
const CharacterApiService = new FavoriteCharacterApiService();

export default CharacterApiService;
