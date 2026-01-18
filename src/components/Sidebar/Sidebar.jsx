import { ChevronDown, ExternalLink } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Copyright } from '@/components/Copyright'
import { Logo } from '@/components/icons'
import {
  Badge,
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

import { ActiveIndicator } from './ActiveIndicator'

const formatBadge = count => {
  const num = Number(count)

  return isNaN(num) || num <= 0 ? '0' : num > 9 ? '9+' : num
}

export const Sidebar = ({ items }) => {
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

  return (
    <ShadcnSidebar>
      <SidebarHeader className='h-11 items-center justify-center'>
        <Logo />
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
                        <ChevronDown className='ml-auto shrink-0 transition-transform duration-300 group-data-open/collapsible:rotate-180' />
                      </SidebarMenuButton>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map(subItem => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                isActive={isActive(subItem.url)}
                                onClick={() => navigate(subItem.url)}
                              >
                                <ActiveIndicator
                                  isActive={isActive(subItem.url)}
                                  className='h-3/4'
                                />
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
                      <ActiveIndicator
                        isActive={isActive(item.url)}
                        className='h-full'
                      />
                      {item.icon && <item.icon />}
                      <span>{t(item.title)}</span>
                      {item.external && <ExternalLink />}
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge className='top-1/2! -translate-y-1/2'>
                        <Badge variant='notification'>
                          {formatBadge(item.badge)}
                        </Badge>
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
