# BSA-2022 | GuruHub

## ℹ️ General Info

This is the repository responsible for GuruHub's apps.

## 🏭 Applications

- [Backend](./backend) — GuruHub's application backend.

  _To work properly, fill in the **`.env`** file. Use the **`.env.example`** file as an example._

- [Frontend](./frontend) — GuruHub's application frontend.

  _To work properly, fill in the **`.env`** file. Use the **`.env.example`** file as an example._

- [Shared](./shared) — GuruHub's application common modules for reuse.

## 🖍 Requirements

- [NodeJS](https://nodejs.org/en/) (16.x.x);
- [NPM](https://www.npmjs.com/) (8.x.x);
- [PostgreSQL](https://www.postgresql.org/) (14.2)
- run **`npx simple-git-hooks`** at the root of the project, before the start (it will set the [pre-commit hook](https://www.npmjs.com/package/simple-git-hooks) for any commits).

## 🏃‍♂️ Simple Start

1. **`npm run install:all`** at the root
2. Fill ENVs
3. **`npx simple-git-hooks`** at the root
4. **`cd frontend && npm run start`** then **`cd backend && npm run start:dev`**
5. Enjoy <3

## Architecture

### 🏗 Application Schema

**TODO**

### 💽 DB Schema

```mermaid
erDiagram

    users {
      int id PK
      dateTime created_at
      dateTime updated_at
      varchar email
      text password_hash
      text password_salt
      int group_id FK
  }

  groups {
      int id PK
      dateTime created_at
      dateTime updated_at
      varchar name
      varchar key
  }

  users_to_groups }|--|| groups : group_id
  users_to_groups }|--|| users : user_id
  users_to_groups {
      int id PK
      dateTime created_at
      dateTime updated_at
      int group_id FK "unique (group_id user_id)"
      int user_id FK "unique (group_id user_id)"
  }

  permissions {
      int id PK
      dateTime created_at
      dateTime updated_at
      varchar name
      varchar key
  }

  groups_to_permissions }|--|| permissions : permission_id
  groups_to_permissions }|--|| groups : group_id
  groups_to_permissions {
      int id PK
      dateTime created_at
      dateTime updated_at
      int permission_id FK "unique (permission_id group_id)"
      int group_id FK "unique (permission_id group_id)"
  }

  user_details ||--|| users : user_id
  user_details {
      int id PK
      dateTime created_at
      dateTime updated_at
      int user_id FK
      varchar first_name
      varchar last_name
      varchar gender
      varchar avatar_url
      date date_of_birth
  }

  courses ||--|| vendors : vendor_id
  courses }|--|| course_categories : course_category_id
  courses {
      int id PK
      dateTime created_at
      dateTime updated_at
      varchar title
      text description
      varchar url
      int vendor_id FK
      int course_category_id FK
  }

  course_modules }|--|| courses : course_id
  course_modules {
      int id PK
      dateTime created_at
      dateTime updated_at
      int course_id FK
      int module_index
      varchar title
      text description
  }

  course_categories {
      int id PK
      dateTime created_at
      dateTime updated_at
      varchar name
      varchar key
  }

  vendors {
      int id PK
      dateTime created_at
      dateTime updated_at
      varchar name
      varchar key
  }

  mentees_to_mentors }|--|| courses : course_id
  mentees_to_mentors }|--|| users : mentor_id
  mentees_to_mentors }|--|| users : mentee_id
  mentees_to_mentors {
      int id PK
      dateTime created_at
      dateTime updated_at
      int course_id FK
      int mentor_id FK
      int mentee_id FK
  }

  tasks }|--|| mentees_to_mentors : mentees_to_mentors_id
  tasks }|--|| course_modules : module_id
  tasks {
    int id PK
    dateTime created_at
    dateTime updated_at
    int mentees_to_mentors_id FK
    int module_id FK
    enum status
  }

  interviews }|--o| users : interviewer_user_id
  interviews }|--|| users : interviewee_user_id
  interviews }|--|| course_categories : course_categories_id
  interviews {
    int id PK
    dateTime created_at
    dateTime updated_at
    dateTime interview_date
    int interviewer_user_id FK
    int interviewee_user_id FK
    int category_id FK
    enum status
  }

  interview_notes }|--|| interviews : interview_id
  interview_notes }|--|| users : author_id
  interview_notes {
    int id PK
    dateTime created_at
    dateTime updated_at
    int interview_id FK
    int author_id FK
    text note
  }

  files ||--|| user_details : avatar_url
  files {
    int id PK
    dateTime created_at
    dateTime updated_at
    varchar url
    varchar content_type
  }

  courses_to_mentors }|--|| courses : course_id
  courses_to_mentors }|--|| users : user_id
  courses_to_mentors {
    int id PK
    dateTime created_at
    dateTime updated_at
    int user_id FK
    int course_id FK
  }

  chat_messages }|--|| user : sender_id
  chat_messages }|--|| user : receiver_id
  chat_messages {
    int id PK
    dateTime created_at
    dateTime updated_at
    int sender_id FK
    int receiver_id FK
    text message
    text chat_id
  }

  task_notes }|--|| tasks : task_id
  task_notes }|--|| users : author_id
  task_notes {
    int id PK
    dateTime created_at
    dateTime updated_at
    int task_id FK
    int author_id FK
    enum status
  }
```

## 🧑‍💻 CI

### 🗜 Tools

### 🌑 Backend

- [Fastify](https://www.fastify.io/) – a backend framework.
- [Knex](https://knexjs.org/) – a query builder.
- [Objection](https://vincit.github.io/objection.js/) – an ORM.

### 🌕 Frontend

- [React](https://reactjs.org/) – a frontend library.
- [Redux](https://redux.js.org/) + [Redux Toolkit](https://redux-toolkit.js.org/) – a state manager.

#### 🥊 Code quality

- [simple-git-hooks](https://www.npmjs.com/package/simple-git-hooks) — a tool that lets you easily manage git hooks.
- [lint-staged](https://www.npmjs.com/package/lint-staged) — run linters on git staged files.
- [editorconfig](https://editorconfig.org/) — helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
- [prettier](https://prettier.io/) — an opinionated code formatter.
- [ls-lint](https://ls-lint.org/) — file and directory name linter.
- [eslint](https://eslint.org/) – find problems in your JS code
- [stylelint](https://stylelint.io/) – Find and fix problems in your CSS code

### 🗞 Git

#### 📊 Branches

- **`production`** - production source code.
- **`development`** - staging source code.

#### 👍👎 Pull Request flow

```
<project-prefix>-<ticket-number>: <ticket-title>
```

##### Example:

`blog-5: Add form component`

#### 🌳 Branch flow

```
<type>/<project-prefix><ticket-number>-<short-desc>
```

##### Types:

- task
- fix

##### Examples:

- `task/design5-add-signin-page`
- `task/blog12-add-filters`
- `fix/design16-fix-signup-validation`

#### 🗂 Commit flow

```
<project-prefix>-<ticket-number>: <modifier> <desc>
```

##### Modifiers:

- `+` (add)
- `*` (edit)
- `-` (remove)

##### Examples:

- `blog-5: + form component`
- `design-12: * filter markup`
- `blog-16: - require prop for nickname field`

## 📦 CD

[Handled](.github/workflows/cd.yml) by [GitHub Actions](https://docs.github.com/en/actions).
