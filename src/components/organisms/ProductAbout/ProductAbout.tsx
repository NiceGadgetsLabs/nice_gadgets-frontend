import type { FC } from 'react';
import { SectionHeading } from '../../molecules/SectionHeading/SectionHeading';
import type { Description } from '../../../types/ProductDetails';
import './ProductAbout.scss';

interface Props {
  description: Description[];
}

export const ProductAbout: FC<Props> = ({ description }) => {
  return (
    <section className="about">
      <SectionHeading title="About" />

      <div className="about__sections">
        {description.map((section) => (
          <article key={section.title} className="about__section">
            <h3 className="about__subtitle">{section.title}</h3>

            {section.text.map((paragraph) => (
              <p key={paragraph} className="about__text">
                {paragraph}
              </p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
};
