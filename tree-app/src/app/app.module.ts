import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TreeNodeComponent } from './components/tree-node/tree-node.component';
import { TreeComponent } from './components/tree/tree.component';

@NgModule({
    declarations: [
        AppComponent,
        TreeNodeComponent,
        TreeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
