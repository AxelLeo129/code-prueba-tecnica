import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  /**
   * Realiza una petición HTTP PUT a una URL construida a partir del endpoint y el ID proporcionados.
   * Envía el cuerpo de la petición especificado y devuelve una promesa con la respuesta.
   *
   * @param endpoint La parte del endpoint de la URL a la que se realizará la petición PUT.
   * @param id El identificador que se anexará al endpoint para construir la URL completa.
   * @param body El cuerpo de la petición a enviar.
   * @returns Una promesa que resuelve con la respuesta del servidor.
   * @template T El tipo de la respuesta esperada.
   * @template B El tipo del cuerpo de la solicitud.
   */
  put<T, B>(endpoint: string, id: string, body: B): Promise<T | undefined> {
      const url = `${environment.apiUrl}${endpoint}/${id}`;
      return this.http.put<T>(url, body).toPromise();
  }

  /**
   * Realiza una solicitud HTTP GET a un endpoint específico, adjuntando un conjunto de parámetros de consulta.
   * Esta función construye una cadena de parámetros de consulta a partir de un objeto `Map` proporcionado, donde cada entrada
   * del `Map` representa un par clave-valor que se incluirá en la URL de la solicitud como parámetro de consulta.
   * Utiliza el servicio HTTP para enviar la solicitud, concatenando la URL base obtenida del `envService` con el endpoint y
   * los parámetros de consulta. La función devuelve una promesa que resuelve con el tipo de dato genérico `T`, permitiendo
   * especificar el tipo de respuesta esperada al realizar la llamada a la función.
   *
   * @template T El tipo de dato esperado en la respuesta de la solicitud HTTP GET.
   * @param endpoint El endpoint relativo al que se realizará la solicitud, sin incluir la URL base.
   * @param values Un objeto `Map<string, string>` que contiene los parámetros de consulta a adjuntar a la URL.
   *
   * @returns Una promesa que resuelve con una respuesta del tipo especificado `T`.
   *
   */
  getWithParams<T>(endpoint: string, values: Map<string, string>): Promise<T | undefined> {
      let params = "?";
      values.forEach((value: string, key: string) => {
          params = params + key + '=' + value + '&';
      });
      return this.http.get<T>(environment.apiUrl + endpoint + params).toPromise();
  }

  /**
   * Realiza una solicitud HTTP POST a un endpoint específico, enviando datos en el cuerpo de la solicitud.
   * Esta función es genérica y permite especificar el tipo de la respuesta (`T`) y el tipo del cuerpo de la solicitud (`B`),
   * lo que hace posible su uso en una amplia variedad de situaciones donde se necesite enviar datos al servidor y recibir
   * una respuesta de un tipo específico. Utiliza el servicio HTTP para enviar la solicitud, concatenando la URL base obtenida
   * del `envService` con el endpoint proporcionado y enviando el cuerpo de la solicitud. La función devuelve una promesa
   * que resuelve con el tipo de dato genérico `T`, indicando el tipo de respuesta esperada.
   *
   * @template T El tipo de dato esperado en la respuesta de la solicitud HTTP POST.
   * @template B El tipo de dato del cuerpo de la solicitud HTTP POST.
   * @param endpoint El endpoint relativo al que se realizará la solicitud, sin incluir la URL base.
   * @param body El cuerpo de la solicitud a enviar, del tipo especificado por `B`.
   *
   * @returns Una promesa que resuelve con una respuesta del tipo especificado `T`.
   *
   */
  post<T, B>(endpoint: string, body: B): Promise<T | undefined> {
      return this.http.post<T>(environment.apiUrl + endpoint, body).toPromise();
  }

  /**
   * Realiza una solicitud HTTP GET a un endpoint específico y retorna una promesa con la respuesta tipada.
   * Esta función genérica acepta un endpoint como parámetro y utiliza el servicio HTTP para realizar la solicitud,
   * concatenando la URL base (obtenida de `envService`) con el endpoint proporcionado. Está diseñada para ser flexible
   * y reutilizable en diferentes contextos donde se necesite realizar solicitudes GET a la API y esperar respuestas
   * de diversos tipos. La promesa resultante resuelve con una respuesta del tipo genérico `T`, permitiendo una integración
   * fuertemente tipada y segura con el sistema de tipos de TypeScript.
   *
   * @template T El tipo de dato esperado en la respuesta de la solicitud.
   * @param endpoint El endpoint relativo (sin la URL base) al que se realizará la solicitud HTTP GET.
   *
   * @returns Una promesa que resuelve con una respuesta del tipo `T`, proporcionando una forma segura y tipada
   *          de manejar la respuesta.
   *
   */
  get<T>(endpoint: string): Promise<T | undefined> {
      return this.http.get<T>(environment.apiUrl + endpoint).toPromise();
  }

  delete<T>(endpoint: string): Promise<T | undefined> {
    return this.http.delete<T>(environment.apiUrl + endpoint).toPromise();
  }

}
