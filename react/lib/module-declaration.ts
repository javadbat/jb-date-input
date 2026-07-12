import type { JBDateInputWebComponent } from 'jb-date-input';
import type { SizeVariants } from 'jb-input';

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'jb-date-input': JBDateInputType;
    }
    interface JBDateInputType extends React.DetailedHTMLProps<React.HTMLAttributes<JBDateInputWebComponent>, JBDateInputWebComponent> {
      class?: string,
      label?: string,
      name?: string,
      size?:SizeVariants,
      "value-type"?: string,
      "input-type"?: string,
      value?: string | Date | null,
      initialValue?: string | null,
      ref:React.RefObject<JBDateInputWebComponent | null>,
    }
  }
}
