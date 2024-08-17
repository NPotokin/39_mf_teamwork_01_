import { AxiosResponse } from 'axios'
import { axiosDB } from './api'
import {
  IAPIError,
  ISubmitScoreResponse,
  IGetLeaderboardResponse,
  ICurrentScoreResponse,
  ratingFieldName,
  teamName,
} from './model'
import { YANDEX_API_URL } from '@/lib/constants'

export default class LeaderboardApi {
  public submitScore(userLogin: string, score: number, avatar: string) {
    const data = {
      data: {
        userLogin: userLogin,
        pumpkinPandasScoreField: score,
        avatar: avatar,
      },
      ratingFieldName: ratingFieldName,
      teamName: teamName,
    }
    return axiosDB.post<ISubmitScoreResponse>(`${YANDEX_API_URL}/leaderboard`, data)
  }

  public getAllLeaderboard(
    cursor: number,
    limit: number
  ): Promise<AxiosResponse<IGetLeaderboardResponse | IAPIError>> {
    const data = {
      ratingFieldName: ratingFieldName,
      cursor,
      limit,
    }
    return axiosDB.post<IGetLeaderboardResponse>(`${YANDEX_API_URL}/leaderboard/all`, data)
  }

  public getTeamLeaderBoard(
    cursor: number,
    limit: number
  ): Promise<AxiosResponse<ICurrentScoreResponse | IAPIError>> {
    const data = {
      ratingFieldName: ratingFieldName,
      cursor,
      limit,
    }
    return axiosDB.post(`${YANDEX_API_URL}/leaderboard/${teamName}`, data)
  }
}
