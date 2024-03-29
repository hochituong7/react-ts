import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Student } from "models";


export interface DashboardStatistics {
    maleCount: number;
    femaleCount: number;
    highMarkCount: number;
    lowMarkCount: number;
}

export interface RankingByCity{
    cityId: string;
    cityName: string;
    rankingList: Student[]
}

//khai báo state
export interface DashboardState{
    loading: boolean;
    statistics: DashboardStatistics;
    highestStudentList: Student[];
    lowestStudentList: Student[];
    rankingByCityList: RankingByCity[];
}

const initialStateDefault : DashboardState ={
    loading: false,
    statistics:{
        maleCount: 0,
        femaleCount: 0,
        highMarkCount: 0,
        lowMarkCount: 0
    },
    highestStudentList: [],
    lowestStudentList: [],
    rankingByCityList: []
}


const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialStateDefault,
    reducers: {
        fetchData(state){
            state.loading = true;
        },
        fetchDataSuccess(state){
            state.loading = false;
        },
        fetchDataFailed(state){
            state.loading = false;
        },
        setStatistics(state, action: PayloadAction<DashboardStatistics>){
            state.statistics = action.payload;
        },
        setHighestStudentList(state, action: PayloadAction<Student[]>){
            state.highestStudentList = action.payload;
        },
        setLowestStudentList(state, action: PayloadAction<Student[]>){
            state.lowestStudentList = action.payload;
        },
        setRankingByCityList(state, action: PayloadAction<RankingByCity[]>){
            state.rankingByCityList = action.payload;
        }
    }
})

//Action
export const dashboardAction = dashboardSlice.actions;

//Selectors
export const selectStatistics = (state:RootState) => state.dashboard.statistics;
export const selectHighestStudentList = (state:RootState) => state.dashboard.highestStudentList;
export const selectLowestStudentList = (state:RootState) => state.dashboard.lowestStudentList;
export const selectRankingByCityList= (state:RootState) => state.dashboard.rankingByCityList;
export const selectLoading = (state:RootState) => state.dashboard.loading;

//Reducer

const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;