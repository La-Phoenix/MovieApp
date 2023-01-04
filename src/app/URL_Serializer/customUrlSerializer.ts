import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';

export class CustomUrlSerializer implements UrlSerializer {
  parse(url: any): UrlTree {
    let dus = new DefaultUrlSerializer();
    return dus.parse(url);
  }

  serialize(tree: UrlTree): any {
    let dus = new DefaultUrlSerializer(),
      path = dus.serialize(tree);
    // use your regex to replace as per your requirement.
    path = path.replace(/%3F/, '&');
    path = path.replace(/%3D/, '=');
    // path = path.replace(/%2F/, '');
    return path;
  }
}
