
interface NavItem {
  label: string,
  onClick: () => void
}
interface FooterNavProps {
  title: string,
  list: NavItem[],
  className?:string,
}

export type { FooterNavProps }
