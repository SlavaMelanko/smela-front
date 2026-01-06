import { ChevronDown, ExternalLink } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Copyright } from '@/components/Copyright'
import { Logo } from '@/components/icons'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui'
import useLocale from '@/hooks/useLocale'

const Sidebar = ({ items }) => {
  const { t } = useLocale()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isActive = url => pathname === url || pathname.startsWith(`${url}/`)

  const handleClick = item => {
    if (item.external) {
      window.open(item.url, '_blank', 'noopener,noreferrer')
    } else {
      navigate(item.url)
    }
  }

  const formatBadge = count => (count > 9 ? '9+' : count)

  return (
    <ShadcnSidebar>
      <SidebarHeader className='h-11 items-center justify-center'>
        <Logo width={130} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item =>
                item.items ? (
                  <Collapsible
                    key={item.title}
                    defaultOpen={item.items.some(sub => isActive(sub.url))}
                    className='group/collapsible'
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton render={<CollapsibleTrigger />}>
                        {item.icon && <item.icon />}
                        <span>{t(item.title)}</span>
                        <ChevronDown className='ml-auto shrink-0 transition-transform group-data-[state=open]/collapsible:rotate-180' />
                      </SidebarMenuButton>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map(subItem => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                isActive={isActive(subItem.url)}
                                onClick={() => navigate(subItem.url)}
                              >
                                <span>{t(subItem.title)}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive(item.url)}
                      onClick={() => handleClick(item)}
                    >
                      {item.icon && <item.icon />}
                      <span>{t(item.title)}</span>
                      {item.external && <ExternalLink />}
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge>
                        {formatBadge(item.badge)}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Copyright />
      </SidebarFooter>
    </ShadcnSidebar>
  )
}

export default Sidebar
