import { Component, OnInit } from '@angular/core';
import {ITreeOptions, KEYS, TREE_ACTIONS} from "angular-tree-component";
import {Observable} from "rxjs/Observable";
import {ItemsService} from "../../../services/itemsService";
import {log} from "util";

@Component({
  selector: 'app-tree-el',
  templateUrl: './tree-el.component.html',
  styleUrls: ['./tree-el.component.css']
})
export class TreeElComponent implements OnInit {

  catalog : string[];
  nodes;
  id = 0;
  // nodes = [
  //   {
  //     id: 1,
  //     name: 'root1',
  //     children: [
  //       { id: 5, name: 'child1' },
  //       { id: 4, name: 'child2' }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     name: 'root2',
  //     children: [
  //       { id: 3, name: 'child2.1' },
  //       {
  //         id: 6,
  //         name: 'child2.2',
  //         children: [
  //           { id: 7, name: 'subsub' }
  //         ]
  //       }
  //     ]
  //   }
  // ];
  options: ITreeOptions = {
    isExpandedField: 'expanded',
    hasChildrenField: 'nodes',
    actionMapping: {
      mouse: {
        click: (tree, node, $event) => {
          if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
          else this.onActivateEvent($event,node);
        }
      },
      keys: {
        [KEYS.ENTER]: (tree, node, $event) => {
          node.expandeAll();
        }
      }
    },
    nodeHeight: 23
  };

  constructor(private itemsService: ItemsService) {
    // this.nodes = Array.apply(null,Array(10)).map( (form,ind) => {
    //   return new Node(this.id,'popa'+this.id++);
    // });
    //
    // for(let i=0;i<8;i++){
    //   let helper = Array.apply(null,Array(10)).map( (form,ind) => {
    //     return new Node(this.id,'popa'+this.id++);
    //   });
    //     this.fillArray(helper,this.nodes,2);
    // }
    let catalogToget: Observable<any> = this.itemsService.getCatalogCors();
    catalogToget.subscribe(data => {
      this.catalog = data;
      let podes = [];
      this.catalog.forEach((element,index) => {
        let catPath = element.split('/');
        this.checker(podes,catPath,catPath.length);
      });
      this.nodes = podes;
    });
  }

  ngOnInit() {
  }

  onActivateEvent($event,node?){
    console.log($event);
    if(node.data.theme){
      this.itemsService.getItemsByTheme(node.data.theme);
    }
  }

  checker(nodes:Node[],catPath:string[],num){
    if(num === 0)return;
    let found = false;
    nodes.forEach(node => {
      if(node.name === catPath[catPath.length - num]){
        this.checker(node.children,catPath,--num);
        found = true;
      }
    });
    if(!found)this.createNodes(nodes,catPath,num);
  }

  createNodes(nodes:Node[],catPath:string[],num){
    let nodeHolder;
    let ind = catPath.length - 1;
    for(;num>0;num--){
      let node = new Node(this.id++,catPath[ind]);
      if(ind === catPath.length - 1)node.theme = catPath.join('/');
      ind--;
      if(nodeHolder)node.children.push(nodeHolder);
      nodeHolder = node;
    }
    nodes.push(nodeHolder);
  }

  // fillArray(toAdd: Node[],arr: Node[],index){
  //   if(arr[index].children !== undefined){
  //     this.fillArray(toAdd,arr[index].children,index);
  //   }
  //   else{
  //     arr[index].children = toAdd;
  //   }
  // }

}



class Node {
  id;
  name;
  children;
  theme;

  constructor(id,name) {
    this.name = name;
    this.id = id;
    this.children = [];
  }

}
