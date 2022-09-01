import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

import AdobeXD from '~/assets/images/categories/adobe-xd.svg';
import AfterEffects from '~/assets/images/categories/after-effects.svg';
import Angular from '~/assets/images/categories/angular.svg';
import AngularJS from '~/assets/images/categories/angularjs.svg';
import Ansible from '~/assets/images/categories/ansible.svg';
import Appium from '~/assets/images/categories/appium.svg';
import Atom from '~/assets/images/categories/atom.svg';
import AWS from '~/assets/images/categories/aws.svg';
import Azure from '~/assets/images/categories/azure.svg';
import Babel from '~/assets/images/categories/babel.svg';
import Backend from '~/assets/images/categories/backend.svg';
import BarbaJS from '~/assets/images/categories/barba-js.svg';
import Bash from '~/assets/images/categories/bash.svg';
import Blender from '~/assets/images/categories/blender.svg';
import Blockchain from '~/assets/images/categories/blockchain.svg';
import C from '~/assets/images/categories/c.svg';
import CSharp from '~/assets/images/categories/c-sharp.svg';
import ChromeDevtools from '~/assets/images/categories/chrome-devtools.svg';
import Cinema4d from '~/assets/images/categories/cinema-4d.svg';
import Conferences from '~/assets/images/categories/conferences.svg';
import CoreData from '~/assets/images/categories/core-data.svg';
import CorelDraw from '~/assets/images/categories/coreldraw.svg';
import Cryptocurrency from '~/assets/images/categories/cryptocurrency.svg';
import CSS from '~/assets/images/categories/css.svg';
import Cypress from '~/assets/images/categories/cypress.svg';
import D3JS from '~/assets/images/categories/d3-js.svg';
import DappsWeb3 from '~/assets/images/categories/dapps-web-3.svg';
import DartAndFlutter from '~/assets/images/categories/dart-and-flutter.svg';
import DataProcessingAndAnalysis from '~/assets/images/categories/data-processing-and-analysis.svg';
import Deno from '~/assets/images/categories/deno.svg';
import Django from '~/assets/images/categories/django.svg';
import Docker from '~/assets/images/categories/docker.svg';
import Drupal from '~/assets/images/categories/drupal.svg';
import Elasticsearch from '~/assets/images/categories/elasticsearch.svg';
import Electron from '~/assets/images/categories/electron.svg';
import Elixir from '~/assets/images/categories/elixir.svg';
import Elm from '~/assets/images/categories/elm.svg';
import Ember from '~/assets/images/categories/ember.svg';
import EthicalHacking from '~/assets/images/categories/ethical-hacking.svg';
import Figma from '~/assets/images/categories/figma.svg';
import Firebase from '~/assets/images/categories/firebase.svg';
import Flux from '~/assets/images/categories/flux.svg';
import Frontend from '~/assets/images/categories/frontend.svg';
import Gamedev from '~/assets/images/categories/gamedev.svg';
import Gatsby from '~/assets/images/categories/gatsby.svg';
import Git from '~/assets/images/categories/git.svg';
import GitHub from '~/assets/images/categories/github.svg';
import GitLab from '~/assets/images/categories/gitlab.svg';
import Golang from '~/assets/images/categories/golang.svg';
import GoogleCloud from '~/assets/images/categories/google-cloud.svg';
import Grafana from '~/assets/images/categories/grafana.svg';
import Graphic from '~/assets/images/categories/graphic.svg';
import GraphQL from '~/assets/images/categories/graphql.svg';
import Grep from '~/assets/images/categories/grep.svg';
import Grunt from '~/assets/images/categories/grunt.svg';
import Gulp from '~/assets/images/categories/gulp.svg';
import HibernateORM from '~/assets/images/categories/hibernate-orm.svg';
import HTML from '~/assets/images/categories/html.svg';
import Illustrator from '~/assets/images/categories/illustrator.svg';
import InformationSecurity from '~/assets/images/categories/information-security.svg';
import InterviewPreparation from '~/assets/images/categories/interview-preparation.svg';
import Ionic from '~/assets/images/categories/ionic.svg';
import Java from '~/assets/images/categories/java.svg';
import JavaScript from '~/assets/images/categories/javascript.svg';
import Jenkins from '~/assets/images/categories/jenkins.svg';
import Joomla from '~/assets/images/categories/joomla.svg';
import JQuery from '~/assets/images/categories/jquery.svg';
import Kubernetes from '~/assets/images/categories/kubernetes.svg';
import Laravel from '~/assets/images/categories/laravel.svg';
import Lightroom from '~/assets/images/categories/lightroom.svg';
import Magento from '~/assets/images/categories/magento.svg';
import Marketing from '~/assets/images/categories/marketing.svg';
import MobileAppsDevelopment from '~/assets/images/categories/mobile-apps-development.svg';
import Modx from '~/assets/images/categories/modx.svg';
import MongoDB from '~/assets/images/categories/mongodb.svg';
import NativeScript from '~/assets/images/categories/nativescript.svg';
import NestJS from '~/assets/images/categories/nestjs.svg';
import NextJS from '~/assets/images/categories/next-js.svg';
import NodeJS from '~/assets/images/categories/node-js.svg';
import NPM from '~/assets/images/categories/npm.svg';
import Opencart from '~/assets/images/categories/opencart.svg';
import Opencv from '~/assets/images/categories/opencv.svg';
import OpenglShadingLanguage from '~/assets/images/categories/opengl-shading-language.svg';
import Phoenix from '~/assets/images/categories/phoenix.svg';
import Photoshop from '~/assets/images/categories/photoshop.svg';
import PHP from '~/assets/images/categories/php.svg';
import PHPStorm from '~/assets/images/categories/phpstorm.svg';
import Playwright from '~/assets/images/categories/playwright.svg';
import Postman from '~/assets/images/categories/postman.svg';
import ProgressiveWepApp from '~/assets/images/categories/progressive-web-app.svg';
import Protractor from '~/assets/images/categories/protractor.svg';
import Python from '~/assets/images/categories/python.svg';
import QA from '~/assets/images/categories/qa.svg';
import React from '~/assets/images/categories/react.svg';
import ReactJS from '~/assets/images/categories/react-js.svg';
import ReactNative from '~/assets/images/categories/react-native.svg';
import Redis from '~/assets/images/categories/redis.svg';
import Ruby from '~/assets/images/categories/ruby.svg';
import RubyOnRails from '~/assets/images/categories/ruby-on-rails.svg';
import Rust from '~/assets/images/categories/rust.svg';
import RxJS from '~/assets/images/categories/rxjs.svg';
import Salt from '~/assets/images/categories/salt.svg';
import Scala from '~/assets/images/categories/scala.svg';
import Selenium from '~/assets/images/categories/selenium.svg';
import Seo from '~/assets/images/categories/seo.svg';
import Shopify from '~/assets/images/categories/shopify.svg';
import Silex from '~/assets/images/categories/silex.svg';
import SingleSPA from '~/assets/images/categories/single-spa.svg';
import Sketch from '~/assets/images/categories/sketch.svg';
import Slim from '~/assets/images/categories/slim.svg';
import SocketIO from '~/assets/images/categories/socket-io.svg';
import Spring from '~/assets/images/categories/spring.svg';
import SpringBoot from '~/assets/images/categories/spring-boot.svg';
import SpringCloud from '~/assets/images/categories/spring-cloud.svg';
import SpringData from '~/assets/images/categories/spring-data.svg';
import SpringHateoas from '~/assets/images/categories/spring-hateoas.svg';
import SpringIntegration from '~/assets/images/categories/spring-integration.svg';
import SpringMVC from '~/assets/images/categories/spring-mvc.svg';
import SpringSecurity from '~/assets/images/categories/spring-security.svg';
import SQL from '~/assets/images/categories/sql.svg';
import Svelte from '~/assets/images/categories/svelte.svg';
import Svn from '~/assets/images/categories/svn.svg';
import Swift from '~/assets/images/categories/swift.svg';
import Symfony from '~/assets/images/categories/symfony.svg';
import System from '~/assets/images/categories/system.svg';
import Terraform from '~/assets/images/categories/terraform.svg';
import ThreeJS from '~/assets/images/categories/three-js.svg';
import Tools from '~/assets/images/categories/tools.svg';
import Typescript from '~/assets/images/categories/typescript.svg';
import Unity from '~/assets/images/categories/unity.svg';
import Unknown from '~/assets/images/categories/unknown.svg';
import Video3d from '~/assets/images/categories/video-3d.svg';
import Vim from '~/assets/images/categories/vim.svg';
import VisualStudioCode from '~/assets/images/categories/visual-studio-code.svg';
import Vue from '~/assets/images/categories/vue.svg';
import Webassembly from '~/assets/images/categories/webassembly.svg';
import Webdriverio from '~/assets/images/categories/webdriverio.svg';
import Webflow from '~/assets/images/categories/webflow.svg';
import Webgl from '~/assets/images/categories/webgl.svg';
import Webpack from '~/assets/images/categories/webpack.svg';
import Webrtc from '~/assets/images/categories/webrtc.svg';
import Wordpress from '~/assets/images/categories/wordpress.svg';
import Xamarin from '~/assets/images/categories/xamarin.svg';
import Yarn from '~/assets/images/categories/yarn.svg';
import Yii from '~/assets/images/categories/yii.svg';
import Zbrush from '~/assets/images/categories/zbrush.svg';

const categoryKeyToImage: Record<string, FC<SvgProps>> = {
  adobe_xd: AdobeXD,
  after_effects: AfterEffects,
  angular: Angular,
  angularjs: AngularJS,
  ansible: Ansible,
  appium: Appium,
  atom: Atom,
  aws: AWS,
  azure: Azure,
  babel: Babel,
  backend: Backend,
  barba_js: BarbaJS,
  bash: Bash,
  blender: Blender,
  blockchain: Blockchain,
  c: C,
  c_sharp: CSharp,
  chrome_devtools: ChromeDevtools,
  cinema_4d: Cinema4d,
  conferences: Conferences,
  core_data: CoreData,
  coreldraw: CorelDraw,
  cryptocurrency: Cryptocurrency,
  css: CSS,
  cypress: Cypress,
  d3_js: D3JS,
  dapps_web_3: DappsWeb3,
  dart_and_flutter: DartAndFlutter,
  data_processing_and_analysis: DataProcessingAndAnalysis,
  deno: Deno,
  django: Django,
  docker: Docker,
  drupal: Drupal,
  elasticsearch: Elasticsearch,
  electron: Electron,
  elixir: Elixir,
  elm: Elm,
  ember: Ember,
  ethical_hacking: EthicalHacking,
  figma: Figma,
  firebase: Firebase,
  flux: Flux,
  frontend: Frontend,
  gamedev: Gamedev,
  gatsby: Gatsby,
  git: Git,
  github: GitHub,
  gitlab: GitLab,
  golang: Golang,
  google_cloud: GoogleCloud,
  grafana: Grafana,
  graphic: Graphic,
  graphql: GraphQL,
  grep: Grep,
  grunt: Grunt,
  gulp: Gulp,
  hibernate_orm: HibernateORM,
  html: HTML,
  illustrator: Illustrator,
  information_security: InformationSecurity,
  interview_preparation: InterviewPreparation,
  ionic: Ionic,
  java: Java,
  javascript: JavaScript,
  jenkins: Jenkins,
  joomla: Joomla,
  jquery: JQuery,
  kubernetes: Kubernetes,
  laravel: Laravel,
  lightroom: Lightroom,
  magento: Magento,
  marketing: Marketing,
  mobile_apps_development: MobileAppsDevelopment,
  modx: Modx,
  mongodb: MongoDB,
  nativescript: NativeScript,
  nestjs: NestJS,
  next_js: NextJS,
  node_js: NodeJS,
  npm: NPM,
  opencart: Opencart,
  opencv: Opencv,
  opengl_shading_language: OpenglShadingLanguage,
  phoenix: Phoenix,
  photoshop: Photoshop,
  php: PHP,
  phpstorm: PHPStorm,
  playwright: Playwright,
  postman: Postman,
  progressive_web_app: ProgressiveWepApp,
  protractor: Protractor,
  python: Python,
  qa: QA,
  react: React,
  react_js: ReactJS,
  react_native: ReactNative,
  redis: Redis,
  ruby: Ruby,
  ruby_on_rails: RubyOnRails,
  rust: Rust,
  rxjs: RxJS,
  salt: Salt,
  scala: Scala,
  selenium: Selenium,
  seo: Seo,
  shopify: Shopify,
  silex: Silex,
  single_spa: SingleSPA,
  sketch: Sketch,
  slim: Slim,
  socket_io: SocketIO,
  spring: Spring,
  spring_boot: SpringBoot,
  spring_cloud: SpringCloud,
  spring_data: SpringData,
  spring_hateoas: SpringHateoas,
  spring_integration: SpringIntegration,
  spring_mvc: SpringMVC,
  spring_security: SpringSecurity,
  sql: SQL,
  svelte: Svelte,
  svn: Svn,
  swift: Swift,
  symfony: Symfony,
  system: System,
  terraform: Terraform,
  three_js: ThreeJS,
  tools: Tools,
  typescript: Typescript,
  unity: Unity,
  unknown: Unknown,
  video_3d: Video3d,
  vim: Vim,
  visual_studio_code: VisualStudioCode,
  vue: Vue,
  webassembly: Webassembly,
  webdriverio: Webdriverio,
  webflow: Webflow,
  webgl: Webgl,
  webpack: Webpack,
  webrtc: Webrtc,
  wordpress: Wordpress,
  xamarin: Xamarin,
  yarn: Yarn,
  yii: Yii,
  zbrush: Zbrush,
};

export { categoryKeyToImage };
