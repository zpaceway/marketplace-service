En grupos de 5, vamos a crear un microservicio llamado cashback-service, el cual se comporta como un servicio de post-procesamiento de pagos altamente transaccional utilizando NestJS y TypeORM.

cashback-service asignará un porcentaje de devolución a cada una de las transacciones que ingresan. El objetivo de este servicio es que el usuario sea capaz de visualizar su monto de devolución acumulado por compras, para así retener al usuario en la plataforma. El usuario será capaz de retirar el mismo a modo de tarjetas precargadas.

Las condiciones para aplicar el porcentaje de devolución son las siguietes: solo serán válidas órdenes que superen los $10, si el usuario tiene menos de 10 transacciones no aplica ningún porcentaje, a más de 10 transacciones empieza a aplicarse un porcentaje de devolución del 1%, a partir de 50 2.5% y a partir de 100 5%.

Analizar cómo se comporta la aplicación con 1000 - 10,000 - 100,000 y 1,000,000 de récord. Los mismos serán proporcionados por el instructor.

--------------------------------------------------------------------

- Autentificación para que los usuarios sean capaces de extraer los datos del cashback service
- Responder como microservicio y procesar ordenes completadas sin cashback

Nuevo modelo:

- Identity server: nos va a permitir dar inicio de sesión a un usuario mediante la comb de su user_id y password, este
servicio retornará un access token y un refresh token. Se puede comunicar con el cashback service para brinda soporte
de sesión y seguridad.

- Cashback engine: recibe las órdenes sin procesar del marketplace-service y siguiendo las reglas establecidas se asigna
un cashback por cada transacción exitosa. Además se puede comunicar con el cashback service para retornar valores acumulados de
cashback por usuario.

- Cashback service: es el servicio que se expone al usuario y recibe las solitudes, este cuenta con un endpoint que hará proxy al
identity server para inicio de sesión y al cashback engine para obtener el valor acumulado del cashback del usuario
