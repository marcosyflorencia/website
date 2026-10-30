import './button.css'

export default function Button({ variant = 'primary', size = 'big', type = 'button', className = '', children, ...props }) {
  return <button className={`button button--${variant} button--${size} ${className}`.trim()} type={type} {...props}>{children}</button>
}
