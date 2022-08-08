import { Knex } from 'knex';

enum ColumnName {
  ID = 'id',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  NAME = 'name',
  KEY = 'key',
}

const TABLE_NAME = 'course_categories';

const courseCategories = [
  'Adobe XD',
  'After Effects',
  'Angular',
  'AngularJS',
  'Ansible',
  'Appium',
  'Atom',
  'AWS',
  'Azure',
  'Babel',
  'barba.js',
  'Bash',
  'Blender',
  'C#',
  'Chrome DevTools',
  'Cinema 4D',
  'Core Data',
  'CorelDRAW',
  'CSS',
  'Cypress',
  'D3.js',
  'Dart and Flutter',
  'Deno',
  'Django',
  'Docker',
  'Drupal',
  'Elasticsearch',
  'Electron',
  'Elixir',
  'Elm',
  'Ember',
  'Figma',
  'Firebase',
  'Flux',
  'Gatsby',
  'Git',
  'GitHub',
  'Gitlab',
  'Golang',
  'Google Cloud',
  'Grafana',
  'GraphQL',
  'Grep',
  'Grunt',
  'Gulp',
  'Hibernate ORM',
  'HTML',
  'Illustrator',
  'Ionic',
  'Java',
  'JavaScript',
  'Jenkins',
  'Joomla',
  'JQuery',
  'Kubernetes',
  'Laravel',
  'Lightroom',
  'Magento',
  'MODX',
  'MongoDB',
  'NativeScript',
  'NestJS',
  'Next.js',
  'Node.js',
  'NPM',
  'OpenCart',
  'OpenCV',
  'OpenGL Shading Language (GLSL)',
  'Phoenix',
  'Photoshop',
  'PHP',
  'PhpStorm',
  'Playwright',
  'Postman',
  'Progressive Web App (PWA)',
  'Protractor',
  'Python',
  'React Native',
  'React.js',
  'Redis',
  'Ruby',
  'Ruby on Rails',
  'Rust',
  'RxJS',
  'Salt',
  'Scala',
  'Selenium',
  'SEO',
  'Shopify',
  'Silex',
  'single-spa',
  'Sketch',
  'Slim',
  'Socket.IO',
  'Spring',
  'Spring Boot',
  'Spring Cloud',
  'Spring Data',
  'Spring HATEOAS',
  'Spring Integration',
  'Spring MVC',
  'Spring Security',
  'SQL',
  'Svelte',
  'SVN',
  'Swift',
  'Symfony',
  'Terraform',
  'Three.js',
  'TypeScript',
  'Unity',
  'Video/3D',
  'VIM',
  'Visual Studio Code',
  'Vue',
  'WebAssembly',
  'WebdriverIO',
  'Webflow',
  'WebGL',
  'Webpack',
  'WebRTC',
  'Wordpress',
  'Xamarin',
  'Yarn',
  'Yii',
  'ZBrush',
  'dApps/Web 3',
  'Blockchain',
  'Backend',
  'Frontend',
  'Gamedev',
  'Graphic',
  'Marketing',
  'QA',
  'System',
  'Tools',
  'Mobile apps development',
  'Information security',
  'Conferences',
  'Cryptocurrency',
  'Data processing and analysis',
  'Interview preparation',
  'Ethical hacking',
];

const courseCategoriesSeed = courseCategories.map((category) => {
  const key = category
    .toLowerCase()
    .replace(/ *\([^)]*\) */g, '')
    .replace(/\s+|\./g, '-');

  return {
    name: category,
    key: key,
  };
});

async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.NAME).unique().notNullable();
    table.string(ColumnName.KEY).unique().notNullable();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });
  await knex(TABLE_NAME).insert(courseCategoriesSeed);
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
