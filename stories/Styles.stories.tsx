import React, { useEffect, useRef } from 'react';
import { JBDateInput } from 'jb-date-input/react';
import type { JBDateInputWebComponent } from 'jb-date-input';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '../../../docs/styles/ant-design.css';
import '../../../docs/styles/aurora.css';
import '../../../docs/styles/bootstrap.css';
import '../../../docs/styles/candy.css';
import '../../../docs/styles/carbon.css';
import '../../../docs/styles/cupertino.css';
import '../../../docs/styles/fluent.css';
import '../../../docs/styles/forest.css';
import '../../../docs/styles/material.css';
import '../../../docs/styles/porcelain.css';
import '../../../docs/styles/sunset.css';
import '../../../docs/styles/terminal.css';
import '../../jb-input/stories/styles/style-ant-design.css';
import '../../jb-input/stories/styles/style-aurora.css';
import '../../jb-input/stories/styles/style-bootstrap.css';
import '../../jb-input/stories/styles/style-candy.css';
import '../../jb-input/stories/styles/style-carbon.css';
import '../../jb-input/stories/styles/style-cupertino.css';
import '../../jb-input/stories/styles/style-fluent.css';
import '../../jb-input/stories/styles/style-forest.css';
import '../../jb-input/stories/styles/style-material.css';
import '../../jb-input/stories/styles/style-porcelain.css';
import '../../jb-input/stories/styles/style-sunset.css';
import '../../jb-input/stories/styles/style-terminal.css';
import '../../jb-calendar/stories/styles/style-ant-design.css';
import '../../jb-calendar/stories/styles/style-aurora.css';
import '../../jb-calendar/stories/styles/style-bootstrap.css';
import '../../jb-calendar/stories/styles/style-candy.css';
import '../../jb-calendar/stories/styles/style-carbon.css';
import '../../jb-calendar/stories/styles/style-cupertino.css';
import '../../jb-calendar/stories/styles/style-fluent.css';
import '../../jb-calendar/stories/styles/style-forest.css';
import '../../jb-calendar/stories/styles/style-material.css';
import '../../jb-calendar/stories/styles/style-porcelain.css';
import '../../jb-calendar/stories/styles/style-sunset.css';
import '../../jb-calendar/stories/styles/style-terminal.css';
import './styles/style-ant-design.css';
import './styles/style-aurora.css';
import './styles/style-bootstrap.css';
import './styles/style-candy.css';
import './styles/style-carbon.css';
import './styles/style-cupertino.css';
import './styles/style-fluent.css';
import './styles/style-forest.css';
import './styles/style-material.css';
import './styles/style-porcelain.css';
import './styles/style-sunset.css';
import './styles/style-terminal.css';

const meta = {
  title: "Components/form elements/Inputs/JBDateInput/Style",
  component: JBDateInput } satisfies Meta<typeof JBDateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const styleSamples = [
  { name: "Carbon", themeClassName: "carbon-style"},
  { name: "Aurora", themeClassName: "aurora-style"}, 
  { name: "Forest", themeClassName: "forest-style"}, 
  { name: "Sunset", themeClassName: "sunset-style"}, 
  { name: "Porcelain", themeClassName: "porcelain-style" },
  { name: "Candy", themeClassName: "candy-style" },
  { name: "Terminal", themeClassName: "terminal-style" },
  { name: "Material", themeClassName: "material-style" },
  { name: "Fluent", themeClassName: "fluent-style",},
  { name: "Bootstrap", themeClassName: "bootstrap-style" },
  { name: "Cupertino", themeClassName: "cupertino-style" },
  { name: "Ant Design", themeClassName: "ant-design-style" },
];

type DateInputStyleSampleProps = {
  className: string;
};

function DateInputStyleSample({ className }: DateInputStyleSampleProps) {
  return (
    <div style={{
      display: "grid",
      gap: "0.75rem",
      minWidth: 0,
      maxWidth: "100%",
      width: "100%" }}>
      <JBDateInput className={className} label="Start date" placeholder="YYYY/MM/DD" message="Pick a project date" />
      <JBDateInput className={className} label="Selected date" value="2024-02-29T00:00:00.000Z" inputType="GREGORIAN" valueType="GREGORIAN" />
      <JBDateInput className={className} label="Validation error" error="Static Date Input Error Message" />
      <JBDateInput className={className} label="Disabled date-input" disabled />
    </div>
  );
}

export const Gallery: Story = {
  name: "Gallery",
  render: () => (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(21rem, 1fr))",
      gap: "1.25rem",
      alignItems: "start",
      width: "min(100%, 82rem)" }}>
      {styleSamples.map((sample) => (
        <section
          key={sample.themeClassName}
          style={{
            display: "grid",
            gap: "0.75rem",
            minWidth: 0,
            padding: "1rem",
            background: "var(--jb-surface, #ffffff)",
            border: "1px solid var(--jb-border-color, #e5e7eb)",
            borderRadius: "0.75rem",
            boxShadow: "0 0.75rem 1.75rem oklch(0% 0 0 / 0.08)" }}
          className={sample.themeClassName}
        >
          <div style={{
            width: "100%",
            color: "var(--jb-text-primary, #334155)",
            fontSize: "0.875rem",
            fontWeight: 700,
            lineHeight: 1.4,
            textAlign: "center" }}>
            {sample.name}
          </div>
          <DateInputStyleSample
            className={sample.themeClassName}
          />
        </section>
      ))}
    </div>
  ) };

export const Default: Story = {
  name: "Default",
  render: () => <DateInputStyleSample className="" />,
};

export const Carbon: Story = {
  name: "Carbon",
  render: () => <DateInputStyleSample className="carbon-style" /> };

export const Aurora: Story = {
  name: "Aurora",
  render: () => <DateInputStyleSample className="aurora-style" /> };

export const Forest: Story = {
  name: "Forest",
  render: () => <DateInputStyleSample className="forest-style" /> };

export const Sunset: Story = {
  name: "Sunset",
  render: () => <DateInputStyleSample className="sunset-style" /> };

export const Porcelain: Story = {
  name: "Porcelain",
  render: () => <DateInputStyleSample className="porcelain-style" /> };

export const Candy: Story = {
  name: "Candy",
  render: () => <DateInputStyleSample className="candy-style" /> };

export const Terminal: Story = {
  name: "Terminal",
  render: () => <DateInputStyleSample className="terminal-style" /> };

export const Material: Story = {
  name: "Material",
  render: () => <DateInputStyleSample className="material-style" /> };

export const Fluent: Story = {
  name: "Fluent",
  render: () => <DateInputStyleSample className="fluent-style" /> };

export const Bootstrap: Story = {
  name: "Bootstrap",
  render: () => <DateInputStyleSample className="bootstrap-style" /> };

export const Cupertino: Story = {
  name: "Cupertino",
  render: () => <DateInputStyleSample className="cupertino-style" /> };

export const AntDesign: Story = {
  name: "Ant Design",
  render: () => <DateInputStyleSample className="ant-design-style" /> };
