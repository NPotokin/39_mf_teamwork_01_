import { AxiosResponse } from 'axios'
import axiosDB from './api'
import {
  IAPIError,
  ISubmitScoreResponse,
  IGetLeaderboardResponse,
  ICurrentScoreResponse,
  ratingFieldName,
  teamName,
} from './model'

export default class LeaderboardApi {
  public submitScore(
    userLogin: string,
    score: number
  ) {
    const data = {
      data: {
        userLogin: userLogin,
        pumpkinPandasScoreField: score,
      },
      ratingFieldName: ratingFieldName,
      teamName: teamName,
    }
    return axiosDB.post<ISubmitScoreResponse>(
      '/leaderboard',
      data
    )
  }

  public getAllLeaderboard(
    cursor: number,
    limit: number
  ): Promise<
    AxiosResponse<
      IGetLeaderboardResponse | IAPIError
    >
  > {
    const data = {
      ratingFieldName: ratingFieldName,
      cursor,
      limit,
    }
    return axiosDB.post<IGetLeaderboardResponse>(
      '/leaderboard/all',
      data
    )
  }

  public getTeamLeaderBoard(
    cursor: number,
    limit: number
  ): Promise<
    AxiosResponse<
      ICurrentScoreResponse | IAPIError
    >
  > {
    const data = {
      ratingFieldName: ratingFieldName,
      cursor,
      limit,
    }
    return axiosDB.post(
      `/leaderboard/${teamName}`,
      data
    )
  }
}
