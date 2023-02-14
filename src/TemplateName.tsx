import React from 'react'
import styles from './TemplateName.module.scss'

export interface ITemplateNameProps {
  sampleTextProp: string
}

const TemplateName: React.FC<ITemplateNameProps> = ({ sampleTextProp }) => {
  return <div className={styles.component}>{sampleTextProp}</div>
}

export default TemplateName
