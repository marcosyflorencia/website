import './button.css'

export default function Button({ variant = 'primary', type = 'button', className = '', href, children, ...props }) {
  const classes = `button button--${variant} ${className}`.trim()
  if (href) return <a className={classes} href={href} {...props}>{children}</a>
  return <button className={classes} type={type} {...props}>{children}</button>
}
