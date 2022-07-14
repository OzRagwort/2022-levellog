import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './Button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}></Button>;

export const BaseButton = Template.bind({});
BaseButton.args = {
  children: '기본버튼',
};

export const SubmitButton = Template.bind({});
SubmitButton.args = {
  children: '제출하기',
};