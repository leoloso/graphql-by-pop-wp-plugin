/**
 * Internal dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import FieldDirectiveTabPanel from './field-directive-tab-panel';
import './style.scss';

/**
 * Display an error message if loading data failed
 */
const withAccessControlList = () => createHigherOrderComponent(
	( WrappedComponent ) => ( props ) => {
		const { className, setAttributes, isSelected, attributes: { typeFields, directives } } = props;
		return (
			<div className={ className }>
				<div className={ className+'__items' }>
					<div className={ className+'__item' }>
						<div className={ className+'__item_data' }>
							<div className={ className+'__item_data_for' }>
								<p className={ className+'__item_data__title' }>
									<strong>{ __('Define access for:', 'graphql-api') }</strong>
								</p>
								{ isSelected &&
									<FieldDirectiveTabPanel
										typeFields={ typeFields }
										directives={ directives }
										setAttributes={ setAttributes }
										className={ className }
									/>
								}
								{ !isSelected &&
									<p>
										Values sarlanga if not selected
									</p>
								}
							</div>
							<div className={ className+'__item_data_who' }>
								<p className={ className+'__item_data__title' }>
									<strong>{ __('Who can access:', 'graphql-api') }</strong>
								</p>
								<WrappedComponent
									{ ...props }
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
	'withAccessControlList'
);

export default withAccessControlList;
