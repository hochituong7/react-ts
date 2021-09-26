import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ListParams, listResponse, PaginationParams, Student } from "models";

//[3]
export interface StudentState {
    loading: boolean;
    list: Student[];
    filter: ListParams;
    pagination: PaginationParams;
}

//[4]
const initialStateDefault: StudentState = {
    loading: false,
    list: [],
    filter: {
        _page: 1,
        _limit: 15,
    },
    pagination: {
        _page: 1,
        _limit: 15,
        _totalRows: 15,
    }
}


//[1]
const studentSlice = createSlice({
    name: 'student',
    initialState: initialStateDefault,
    reducers: {
        fetchStudentList(state,action: PayloadAction<ListParams>){
            state.loading = true;
        },
        fetchStudentListSuccess(state,action: PayloadAction<listResponse<Student>>){
            state.list = action.payload.data;
            state.pagination = action.payload.pagination;
            state.loading = false;
        },
        fetchStudentListFailed(state,action: PayloadAction<any>){
            state.loading = false;
            //Nothing
        },

        setFilter(state, action: PayloadAction<ListParams>){
            state.filter = action.payload;
            //state.loading = false;
        },

        setFilterWithDebounce(state, action: PayloadAction<ListParams>){}

    }
})

//[5]
//Action
export const studentActions = studentSlice.actions;

//[6]
//Selectors
export const selectStudentList = (state: RootState) => state.student.list;
export const selectStudentLoading = (state: RootState) => state.student.loading;
export const selectStudentFilter = (state: RootState) => state.student.filter;
export const selectStudentPagination = (state: RootState) => state.student.pagination;



//[2]
//Reducer
const studentReducer = studentSlice.reducer;
export default studentReducer;