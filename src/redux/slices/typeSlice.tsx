import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ResponseModelDefault from "../../modeles/ResponseModelDefault";


import {AxiosError} from "axios";
import IType from "../../modeles/IType";
import {typeService} from "../../services/type.api.service";



type TypeState = {
    allTypes: ResponseModelDefault;
    type: IType | null;
    loading: boolean;
    error: string | null;
}

const initialState: TypeState = {
    allTypes:{
        count:0,
        next: "",
        previous: "",
        results: []
    },
    type: null,
    loading: false,
    error: null,
};

export const getAllTypes = createAsyncThunk(
    'types/fetchAllTypes',
    async (params:URLSearchParams, thunkAPI) => {
        try {
            let allTypes = await typeService.getAllTypes(params);
            return thunkAPI.fulfillWithValue(allTypes.data);
        } catch (e) {
            let error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    });

export const getTypeById = createAsyncThunk(
    'type/fetchTypeById',
    async (id:string, thunkAPI) => {
        try {
            let type = await typeService.getById(id);
            return thunkAPI.fulfillWithValue(type.data);
        } catch (e) {
            let error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    });

export const typeSlice = createSlice({
    name: 'typeSlice',
    initialState:initialState,
    reducers: {
        fillType: (state, action) => {
            state.type = action.payload;
        },
        refillType: (state, action) => {
            state.allTypes = action.payload;
        },
        getAllTypeRequest(state) {
            state.loading = true;
        },
        updateAllType: (state, action) => {
            state.allTypes = {
                ...state.allTypes,
                ...action.payload
            };
        }

    },
    extraReducers: (builder) => {
        builder
// ---------------------------------fetchAllType----------------------------------------------//
            .addCase(
                getAllTypes.pending,
                (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getAllTypes.fulfilled,
                (state, action) => {
                state.loading = false;
                state.allTypes = action.payload;
            })
            .addCase(
                getAllTypes.rejected,
                (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
// ---------------------------------------getTypeById----------------------------------------------//
            .addCase(
                getTypeById.pending,
                (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getTypeById.fulfilled,
                (state, action) => {
                state.loading = false;
                state.type = action.payload;
            })
            .addCase(
                getTypeById.rejected,
                (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});


export const typeAction = {
    ...typeSlice.actions,
    getAllTypes,
    getTypeById
};
