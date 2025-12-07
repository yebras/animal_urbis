# Guía de Administración - MascotaZEN

¡Felicidades por lanzar MascotaZEN! 🎉
Esta guía te ayudará a gestionar tu aplicación día a día.

## 1. Gestión de Datos (Supabase)
Todo el contenido de tu web vive aquí: [Panel de Supabase](https://supabase.com/dashboard/project/eifhptsrsoetfxqmbbuo)

### 👥 Usuarios
- **Dónde**: Menú lateral `Authentication` -> `Users`.
- **Qué puedes hacer**: Ver correos registrados, enviar emails de reset de contraseña, bloquear o eliminar usuarios.

### 🗃️ Contenido (Noticias, Mascotas, Foro, Recursos)
- **Dónde**: Menú lateral `Table Editor` (icono de tabla/grid).
- **Cómo usarlo**: Funciona como una hoja de cálculo. Selecciona la tabla que quieras editar:
    - **`news_articles`**: Aquí redactas las noticias. Crea una fila nueva, pon título, resumen y URL de la imagen, ¡y aparecerá en la web!
    - **`legal_resources`**: Añade o corrige enlaces a normativas por provincia.
    - **`pets`**: Puedes ver todas las mascotas registradas (y borrarlas si alguna incumple normas).
    - **`forum_posts`**: Aquí moderas el foro. Si ves un post inadecuado, selecciónalo y dale a "Delete rows".

### 🖼️ Imágenes
- **Dónde**: Menú lateral `Storage`.
- **Qué puedes hacer**: Aquí se guardarán las fotos que suban los usuarios (avatares, mascotas).

---

## 2. Gestión de la Web (Vercel)
Tu web está alojada aquí: [Panel de Vercel](https://vercel.com/dashboard)

- **Dominios**: Si compras `mascotazen.es`, lo conectas aquí en `Settings` -> `Domains`.
- **Logs**: Si la web da un "Error 500", puedes ver qué pasó en la pestaña `Logs`.
- **Actualizaciones**: Vercel se encarga de todo. Si "desplegamos" nuevo código, verás aquí el estado de la actualización.

---

## 3. ¿Necesitas un cambio de código?
Si quieres cambiar el color de un botón, añadir una sección nueva o cambiar el logo:
1.  Eso requiere **modificar el código fuente**.
2.  Pídemelo a mí (tu asistente AI) o a un programador.
3.  Una vez hecho el cambio en el código, se enviará a Vercel y se actualizará solo.

---

## 💡 Truco Pro
Para ver tus cambios reflejados en la web al instante tras editar en Supabase, simplemente recarga la página de MascotaZEN en tu navegador.
