import { ImageComponent } from '@shared/components/image/image.component';
import { Story, Meta } from '@storybook/angular/types-6-0';

export default {
  title: 'Example/Image Component',
  component: ImageComponent
} as Meta;

const Template: Story<ImageComponent> = (args: ImageComponent) => ({
  component: ImageComponent,
  props: args
});

export const NoImageCaption = Template.bind({});
NoImageCaption.args = {
  figCaptionTxt: ''
};

export const WithImageCaption = Template.bind({});
WithImageCaption.args = {
  figCaptionTxt: 'Test Caption'
};

export const WithZeroOpacity = Template.bind({});
WithZeroOpacity.args = {
  imgOpacity: 1
};

export const WithHalfOpacity = Template.bind({});
WithHalfOpacity.args = {
  imgOpacity: 0.5
};
