import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ResponseModelDefault from "../../modeles/ResponseModelDefault";


import {AxiosError} from "axios";
import IType from "../../modeles/IType";
import {abilityService} from "../../services/ability.api.service";
import IAbility from "../../modeles/IAbility";



type AbilityState = {
    allAbilities: ResponseModelDefault;
    ability: IAbility | null;
    loading: boolean;
    error: string | null;
}

const initialState: AbilityState = {
    allAbilities:{
        count:0,
        next: "",
        previous: "",
        results: []
    },
    ability: null,
    loading: false,
    error: null,
};

export const getAllAbilities = createAsyncThunk(
    'abilities/fetchAllAbility',
    async (params:URLSearchParams, thunkAPI) => {
        try {
            let allAbilities = await abilityService.getAllAbilities(params);
            return thunkAPI.fulfillWithValue(allAbilities.data);
        } catch (e) {
            let error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    });

export const getAbilityById = createAsyncThunk(
    'ability/fetchAbilityById',
    async (id:string, thunkAPI) => {
        try {
            let ability = await abilityService.getById(id);
            return thunkAPI.fulfillWithValue(ability.data);
        } catch (e) {
            let error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    });

export const abilitySlice = createSlice({
    name: 'abilitySlice',
    initialState:initialState,
    reducers: {
        fillAbility: (state, action) => {
            state.ability = action.payload;
        },
        refillAbility: (state, action) => {
            state.allAbilities = action.payload;
        },
        getAllAbilityRequest(state) {
            state.loading = true;
        },
        updateAllAbility: (state, action) => {
            state.allAbilities = {
                ...state.allAbilities,
                ...action.payload
            };
        }

    },
    extraReducers: (builder) => {
        builder
// ---------------------------------fetchAllAbilities----------------------------------------------//
            .addCase(
                getAllAbilities.pending,
                (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getAllAbilities.fulfilled,
                (state, action) => {
                state.loading = false;
                state.allAbilities = action.payload;
            })
            .addCase(
                getAllAbilities.rejected,
                (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
// ---------------------------------------getAbilityById----------------------------------------------//
            .addCase(
                getAbilityById.pending,
                (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getAbilityById.fulfilled,
                (state, action) => {
                state.loading = false;
                state.ability = action.payload;
            })
            .addCase(
                getAbilityById.rejected,
                (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});


export const abilityAction = {
    ...abilitySlice.actions,
    getAllAbilities,
    getAbilityById
};
