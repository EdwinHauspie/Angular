import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import initPrototypes from './app/util/proto';

initPrototypes();

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(ex => console.error(ex));
