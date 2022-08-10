import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, Day } from '../interfaces/user';
import { Userreg } from '../interfaces/user-reg';
import { UserDTO } from '../interfaces/user-dto';
import { UserError } from '../errors/user-error';
import { herokuURL } from '../app-settings';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    // private readonly URL = '/my-profile-page';

    private URL = herokuURL;

    constructor(private http: HttpClient) { }

    private transformUserDTO(serverData: UserDTO): User[] {
        if (!serverData.success) {
            throw new UserError(serverData['error-infos']);
        }
        return serverData.users;
    }

    registerUser(user: Userreg) {
        return this.http.post(this.URL + '/newregistration', user, { withCredentials: true }).toPromise();
    }

    // delete(id: number) {
    //     return this.http.delete(`${config.apiUrl}/users/${id}`);
    // }

    modifyUser(user: User): Promise<User[]> {
        return this.http.post<User[]>(this.URL + '/modifyprofile', user, { withCredentials: true }).toPromise();
    }

    getEnumKey(en: any, enumValue: string): string {
        const values = Object.values(en);
        const keys = Object.keys(en);
        for (let i = 0; i < values.length; i++) {
            if (values[i] === enumValue) {
                return keys[i];
            }
        }
    }

    checkPictureEndpoint(id: number): Promise<any> {
        return this.http.get(this.URL + '/user/' + id + '/image', {responseType: 'blob', withCredentials: true } ).toPromise();
    }

    // kiszedi a BLANK napokat, hogy szerkesztés után anélkül küldhessük vissza a szerverre
    removeBlankDays(days: Day[]): Day[] {
        const availabilities: Day[] = days.filter((day) => {
            return day.availability !== 'BLANK';
        });
        return availabilities;
    }

}
